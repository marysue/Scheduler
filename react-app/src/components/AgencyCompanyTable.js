import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import FilterListIcon from '@material-ui/icons/FilterList';
import moment from 'moment';
import { getAllCompanyInfo, setAgencyCompanyInfo } from '../store/agencyInfo';


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
  { id: 'companyName', numeric: false, disablePadding: false, label: 'Main Office Name' },
  { id: 'locationName', numeric: false, disablePadding: false, label: 'Location Name'},
  { id: 'address', numeric: false, disablePadding: false, label: 'Location Address' },
  { id: 'contactName', numeric: false, disablePadding: false, label: 'Contact Name' },
  { id: 'contactPhone', numeric: false, disablePadding: false, label: 'Phone' },
  { id: 'contactEmail', numeric: false, disablePadding: false, label: "Email" },
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
          Company List
        </Typography>
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

const AgencyCompanyPlacementTable = ({placements, placementDates}) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useDispatch()


  let companies = useSelector( state => state.agencyInfo.companyInfo.companies )

  console.log(" ******************* Company Table View********************")
  console.log("*********Companies contents: ")
  if (companies) {
  console.log("companies.length: ", companies.length)
  for (let i = 0; i < companies.length; i++) {
    console.log(companies[i])
  }
}

useEffect (() => {

  (async() => {
      const p = await getAllCompanyInfo();
      if (!p.errors) {
          dispatch(setAgencyCompanyInfo(p))

      } else {
          console.log("AgencyView: Error in getAll AgencyCompanyPlacementTableInfo fetch call")
      }
  })()

}, []) ;

  function createData(companyName, locationName, address, contactName, contactPhone, contactEmail) {
      return { companyName, locationName, address, contactName, contactPhone, contactEmail };
    }

  const rows = [];

if(companies) {

    console.log("companies: ")
    for (let i=0; i < companies.length; i++) {
      const companyName = companies[i].companyName;
      //companyName, locationName, address, contactName, contactPhone, contactEmail
        console.log(companies[i]);
        for (let j=0; j < companies[i].companyContacts.length; j++) {
        const locationName = companies[i].companyContacts[j].companyName;
        const address = companies[i].companyContacts[j].addr1 + " " + companies[i].companyContacts[j].addr2 + ", " + companies[i].companyContacts[j].city + ", " + companies[i].companyContacts[j].state + " " + companies[i].companyContacts[j].zip
        const contactName = companies[i].companyContacts[j].name;
        const contactPhone = companies[i].companyContacts[j].phone;
        const contactEmail = companies[i].companyContacts[j].email;
        console.log("Company Name: ", companyName)
        console.log("LocationName:  ", locationName)
        console.log("Address: ", address)
        console.log("contactName: ", contactName);
        console.log("contactPhone: ", contactPhone);
        console.log("contactEmail: ", contactEmail);
        rows.push(createData(
          companyName,
          locationName,
          address,
          contactName,
          contactPhone,
          contactEmail,
          ));
    }
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
                        <TableCell align="left">{row.companyName}</TableCell>
                        <TableCell align="left">{row.locationName}</TableCell>
                        <TableCell align="left">{row.address}</TableCell>
                        <TableCell align="left">{row.contactName}</TableCell>
                        <TableCell align="left">{row.contactPhone}</TableCell>
                        <TableCell align="left">{row.contactEmail}</TableCell>
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
