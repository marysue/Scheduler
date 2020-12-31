import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAgencyCompanyPlacementDates, setAgencyCompanyPlacementInfo, getAllAgencyCompanyPlacementCalendarInfo, getAllAgencyCompanyPlacementTableInfo } from '../../store/agencyCompanyPlacements';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { Table,
         TableBody,
        TableCell,
        TableContainer,
        TableHead,
        TablePagination,
        TableRow,
        TableSortLabel,
        Toolbar,
        Typography,
        Paper,
        IconButton,
        Tooltip,
        FormControlLabel,
        Switch } from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/Delete';
//import FilterListIcon from '@material-ui/icons/FilterList';
import moment from 'moment';



function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'company', numeric: false, disablePadding: false, label: 'Office' },
  { id: 'contactName', numeric: false, disablePadding: false, label: 'Contact Name'},
  { id: 'contactPhone', numeric: false, disablePadding: false, label: 'Phone' },
  { id: 'contactEmail', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'contractorName', numeric: false, disablePadding: false, label: 'Contractor Name' },
  { id: 'staffType', numeric: false, disablePadding: false, label: "Staff Type" },
  { id: 'startDate', numeric: false, disablePadding: false, label: 'Start Date' },
  { id: 'endDate', numeric: false, disablePadding: false, label: 'End Date' }
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const userType = useSelector(state => state.authentication.userType);

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Company Placement Schedule
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            {/* <FilterListIcon /> */}
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: '20px',
  },
  tableCell: {
    paddingLeft: "20px",
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const AgencyCompanyPlacementTable = () => {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useDispatch();
 const agencyPlacements = useSelector(state => state.agencyCompanyPlacements)
  let placements = {};
  if (agencyPlacements) {
    placements = agencyPlacements.placementInfo
  }

  console.log(" ********************Company PlacementsTable View********************")


  useEffect (() => {
    (async() => {
      const p = await getAllAgencyCompanyPlacementTableInfo();
      if (!p.errors) {
          dispatch(setAgencyCompanyPlacementInfo(p.agencyInfo))
      } else {
        console.log("AgencyCompanyPlacementTable:  Error in useEfect");
      }

    })()

  }, [] )

  function createData(company, contactName, contactPhone, contactEmail, contractorName, staffType, startDate, endDate) {
      return { company, contactName, contactPhone, contactEmail, contractorName, staffType, startDate, endDate };
    }

  const rows = [];

if(placements) {
    const placementArr = placements;

    for (let i=0; i < placementArr.length; i++) {
        let companyName = placementArr[i].agencyInfo.companyName + " " + placementArr[i].agencyInfo.contactAddress + ", " + placementArr[i].agencyInfo.contactCity + ", " + placementArr[i].agencyInfo.contactState + "  " + placementArr[i].agencyInfo.contactZip
        let start = moment(placementArr[i].agencyInfo.startDate).format('MM/DD/YYYY');
        let end = moment(placementArr[i].agencyInfo.endDate).format('MM/DD/YYYY');
        let city = placementArr[i].agencyInfo.contractorCity
        let companyContactName = placementArr[i].agencyInfo.contactName
        console.log("Start: ", start.toString());
        console.log("End: ", end.toString())
        rows.push(createData(
          companyName,
          placementArr[i].agencyInfo.contactName,
          placementArr[i].agencyInfo.contactPhone,
          placementArr[i].agencyInfo.contactEmail,
          placementArr[i].agencyInfo.contractorName,
          placementArr[i].agencyInfo.staffType,
          start.toString(),
          end.toString(),
          ));
        }

      }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} padding={"none"}/>
        <TableContainer className={classes.tableCell}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              paddingLeft="10px"
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell align="left">{row.company}</TableCell>
                        <TableCell align="left">{row.contactName}</TableCell>
                        <TableCell align="left">{row.contactPhone}</TableCell>
                        <TableCell align="left">{row.contactEmail}</TableCell>
                        <TableCell align="left">{row.contractorName}</TableCell>
                        <TableCell align="left">{row.staffType}</TableCell>
                        <TableCell align="left">{row.startDate}</TableCell>
                        <TableCell align="left">{row.endDate}</TableCell>
                      </TableRow>
                    )

                })}


              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}

export default AgencyCompanyPlacementTable;
