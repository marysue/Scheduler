import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles  } from '@material-ui/core/styles';
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
import moment from 'moment';
import { setCompanyId } from '../../store/company';
import { setUserType } from '../../store/authentication'
import { setContractorId } from '../../store/contractor';
import { setAgencyId } from '../../store/agencyInfo';
import { getContractorPlacementTableInfo } from '../../store/placement';
import { getCompanyPlacementTableInfo } from '../../store/placement';
import { getAllAgencyTableInfo, setPlacementInfo } from '../../store/placement';

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
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'staffType', numeric: false, disablePadding: true, label: 'Staff Type' },
  { id: 'phone', numeric: false, disablePadding: false, label: 'Phone' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'city', numeric: false, disablePadding: false, label: 'City' },
  { id: 'startDate', numeric: false, disablePadding: false, label: 'Start Date' },
  { id: 'endDate', numeric: false, disablePadding: false, label: 'End Date' }
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

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
          color: "theme.palette.secondary.main",
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
    sliderSuccess: {
      color: theme.palette.success.main,
      '& .MuiSlider-thumb': {
        '&:hover, &.Mui-focusVisible': {
           boxShadow: "blue" // `0px 0px 0px 8px theme.palette.success.main`,
        },
        '&.Mui-active': {
          boxShadow: "blue" //`0px 0px 0px 14px theme.palette.success.main`,
        },
      },
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
          Contractor Schedule
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

const CompanyPlacementTable = () => {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const placements = useSelector(state => state.placement.placementInfo)
  let userType = useSelector(store => store.authentication.userType);
  let contractorId = useSelector(store => store.contractor.contractorId);
  let agencyId = useSelector(store => store.agencyInfo.agencyId);
  let companyId = useSelector(state => state.company.companyId);
  const dispatch = useDispatch();


  console.log(" ********************PlacementsTable View********************")

  useEffect (() => {
    if (!userType) {
      (async() => {
        if (!userType) {
          dispatch(setUserType(window.sessionStorage.getItem("userType")));
         }
        if (!companyId && userType === 'company') {
          dispatch(setCompanyId(window.sessionStorage.getItem("companyId")));
         }
        if (!contractorId && userType === 'contractor') {
          dispatch(setContractorId(window.sessionStorage.getItem("contractorId")));
         }
         if (!agencyId && userType === 'agency') {
           dispatch(setAgencyId(window.sessionStorage.getItem("agencyId")));
         }
      })()
    };
    (async () => {
        console.log("CompanyPlacementTable: setPlacementTableInfo, userType:  ", userType);
      if (userType === 'contractor') {
        const pd = await getContractorPlacementTableInfo(contractorId);
        if (!pd.errors) {
            console.log("I'm a contractor.  Placements length = ", pd.placements.length);
            console.log("placement dates:  ", pd.placements);
            dispatch(setPlacementInfo(pd.placements));
        } else {
            console.log("CompanyPlacementTable: Error with getContractorPlacementTable fetch call");
        }
      } else if (userType === 'agency') {
        console.log("CompanyPlacementTable: calling getAllAgencyTableInfo() fetch");
        const pd = await getAllAgencyTableInfo();
        if (!pd.errors) {
          console.log("CompanyPlacementTable: Agency:  placement length:  ", pd.placements.length);
          console.log("placement dates:  ", pd.placements);
          dispatch(setPlacementInfo(pd.placements));
        } else {
          console.log("Error setting placement Table info for agency");
        }
      } else if (userType === 'company') {
        console.log("CompanyPlacementTable:  calling getCompanyPlacementTableInfo() fetch companyId: ", companyId);
        const pd = await getCompanyPlacementTableInfo(companyId);
        if (!pd.errors) {
          console.log("Company:  placements length is: ", pd.placements.length);
          console.log("placement dates:  ", pd.placements);
          dispatch(setPlacementInfo(pd.placements));
        } else {
          console.log("Error setting placement calendar info for company");
        }
      }
    })()
  }, [dispatch, userType, companyId, contractorId, agencyId] )



  function createData(name, staffType, phone, email, city, startDate, endDate) {
      return { name, staffType, phone, email, city, startDate, endDate };
  }

  const rows = [];
  console.log("Placements is: ", placements);
  if(placements) {
    console.log("placements:  ", placements);
    const placementArr = placements;

    //console.log("We have placements[0]: ", placementArr[0])

    for (let i=0; i < placementArr.length; i++) {
        let start = moment(placementArr[i].contractorInfo.startDate).format('MM/DD/YYYY');
        let end = moment(placementArr[i].contractorInfo.endDate).format('MM/DD/YYYY');
        let city = placementArr[i].contractorInfo.city
        rows.push(createData(
          placementArr[i].contractorInfo.name,
          placementArr[i].contractorInfo.staffType,
          placementArr[i].contractorInfo.phone,
          placementArr[i].contractorInfo.email,
          city,
          start.toString(),
          end.toString(), ));
        }

    }
    console.log("rows.length:  ", rows.length)
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

  const tableCells = (row) => {
    return (
      <>
        <TableCell align="left">{row.name}</TableCell>
        <TableCell align="left">{row.staffType}</TableCell>
        <TableCell align="left">{row.phone}</TableCell>
        <TableCell align="left">{row.email}</TableCell>
        <TableCell align="left">{row.city}</TableCell>
        <TableCell align="left">{row.startDate}</TableCell>
        <TableCell align="left">{row.endDate}</TableCell>
      </>
    )
  }

  if (placements) {
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
                          {tableCells(row)}
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
  } else { return null; }
}

export default CompanyPlacementTable;
