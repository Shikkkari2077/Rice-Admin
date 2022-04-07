import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import Swal from "sweetalert2";
import "react-toggle/style.css"; // for ES6 modules
import Toggle from "react-toggle";
import MUIDataTable from "mui-datatables";
import { Tooltip ,Button} from "@material-ui/core";

import AlertDialog from "../../common/DownloadOption";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
class Checkbox extends React.Component {
  static defaultProps = {
    checked: false,
  };
  render() {
    return (
      <input
        type={this.props.type}
        name={this.props.name}
        checked={this.props.checked}
        onChange={this.props.onChange}
      />
    );
  }
}
class CustomerNotification extends React.Component {
  state = {open: false,
    hideOld: false,
    checkedItems: new Map(),
    check: false,
    downdata: [],
    checked: false,
    data: [],
    hidedownload: false,
    customerNotification: [
      {
        id: "1",
        targetAudience:'Customers',
        template:[
            {id :"1",value:'Welcome <first_name>! Use <personalized_code> on checkout to get <offer_amount> off. Hurry, offer ends in <expiry_time>. Shop now!'},
            {id :"2",value:'Hey <first_name>! Create an account and unlock free shipping for your first two orders. Sign up now!'},
            {id :"3",value:'Hey <first_name>, <product_name> is the new fad! Have you gotten yours yet? Order now!'},
            {id :"4",value:'Hey <first_name>, everyone has grabbed their <product_name>. Hurry and get yours before stocks run out!'},
            {id :"5",value:'Hey <first_name>, get a flat 20% off on your first order. Hurry, offer expires in 24 hours!'},
            {id :"6",value:'Hey <first_name>, you left something behind. No need to worry – we have saved your cart for easy checkout.'},
            {id :"7",value:'Price drop alert: Hey <first_name>, there is a flat 15% off on <product> valid only for the next 12 hours, hurry!'},
            {id :"8",value:'Hey <first_name>, users are raving about their <product>! Check out the reviews and get yours now!'},
            {id :"9",value:'Hey <first_name>, your order is successfuly placed! View your order details here.'},
            {id :"10",value:'Hey <first_name>, your order is shipped and is on its way! You can track the live status here.'},
            {id :"11",value:'Hey <first_name>, your order will be delivered today! Not at home? No worries, inform us here.'},
            {id :"12",value:'Hey <first_name>, your order has been successfully delivered! Not received it? Let us know.'},
            {id :"13",value:'Hey <first_name>, your order has been canceled. Let us know where we went wrong by taking this short survey.'},
            {id :"14",value:'Hey <first_name>, your order refund has been inititiated. The total amount of refund is <price>'}
        ]
      },
    ],
  
  };
  componentWillMount() {
    // this.getUsersList();
  }
//   handleStatusChange = (sid) => {
//     var isChecked = $("#cattogBtn_" + sid);
//     isChecked.prop("checked", !isChecked.prop("checked"));
//     console.log(isChecked.prop("checked"), !isChecked.prop("checked"));
//     if (!isChecked.prop("checked") === true) {
//       var status = "active";
//     } else {
//        status = "inactive";
//     }
//     let newArray = this.state.User_list_data;
//     var a = newArray.find((element) => {
//       return element.id === sid;
//     });
//     a.status = status;
//     console.log(newArray);
//     this.setState({ User_list_data: newArray });
//     Swal.fire("Update Status!", "Status has been updated.", "success");
//   };

//   deletedealer = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You will not be able to recover this !",
//       type: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "No, keep it",
//     }).then((result) => {
//       if (result.value) {
//         Swal.fire("Deleted!", "Dealer has been deleted.", "success");
//       }
//     });
//   };
//   getUsersList = () => {
//     var that = this;
//     var data = new URLSearchParams();
//     // this.setState({ isSaving: true });
//     fetch(Constant.getAPI() + "/users/list", {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
//       },
//       body: data,
//     })
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (json) {
//         if (json.status === true) {
//           console.log(json.data);
//           that.setState({ CustomerNotification: json.data });
//         } else {
//           that.setState({ CustomerNotification: [] });
//           Swal.fire({
//             title: "Something went wrong. Try again after some Time.!",
//             icon: "error",
//             text: "",
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Ok",
//           });
//         }
//       });
//   };
   getMuiTheme = () =>
  createMuiTheme({
    overrides: {
      MUIDataTable: {
        responsiveStacked: {
          maxHeight: '35vh',
          overflowX:'none'
        },
      },
      MUIDataTableHeadCell: {
        root: {
         
          fontWeight: "bold",
          padding: "1px",
          lineHeight:'10px',
          whiteSpace: "normal",
          overflow: "hidden",
          wordWrap: "break-word",
          fontSize: "10px",
        },
      },
      MUIDataTableBodyCell: {
        root: {
         
          fontSize:'9px',
          // border:'1px solid black',
          padding:'1px',
          whiteSpace: "normal",
          wordWrap: "break-word",
        },
      },
    },
  });
openModel = () => {
    this.setState({
      open: true,
    });
  };
  handleClose = () => {
    this.setState({
      open: false,
    });
  };
  selectall = (e) => {
    this.setState({
      hidedownload: !this.state.hidedownload,
      checkedItems: new Map(),
      hideOld: !this.state.hideOld,
    });
  };
  selctSingle = (e, id) => {
    // this.setState({
    //   hidedownload:!this.state.hidedownload,
    //   check:id,
    //   // [e.trget.id]: e.target.value
    // })
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState((prevState) => ({
      hidedownload: !this.state.hidedownload,
      checkedItems: prevState.checkedItems.set(item, isChecked),
    }));
    // this.props.categoryData.data.forEach(d => {
    //   this.setState({
    //   check : !this.state.check
    // })
    // })
  };

  handleChange = (e, id) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState((prevState) => ({
      hidedownload: !this.state.hidedownload,
      checkedItems: prevState.checkedItems.set(item, isChecked),
    }));
    console.log(this.state.checkedItems);
    let newArray = this.state.CustomerNotification.filter((d) => {
      // console.log(d)
      let searchValue = d.id;
      return searchValue.indexOf(item) !== -1;
    });
    console.log(newArray);
    this.setState({
      downdata: [...this.state.downdata,newArray],
    });
    console.log(this.state.downdata)
  };
  render() {
    const columns = [
   
      {
        name: "targetAudience",
        label: "Target Audience",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "template",
        label: "Template",
        options: {
          filter: false,
          sort: false,
          customBodyRender:(template,tableMeta)=>{
              console.log(template)
              return <>
              {template.map((data,i)=><div key={data.id} style={{padding:'15px',borderBottom:'.8px solid grey',width:'auto', height: "100%",
                  whiteSpace: "initial",
                  wordWrap: "break-word",
              wordSpacing:'initial'}}>
              {data.value}
             </div>
          )}
         </>
        },
      }
    },
      
    ];
    const options = {
        filter:false,
      filterType: "false",
       viewColumns: false,
      responsive: 'scrollMaxHeight',search:false,
      selectableRows: false,
      download: false,
      confirmFilters: this.state.isLoading,
      customFilterDialogFooter: (currentFilterList, applyNewFilters) => {
        return (
          <div style={{ marginTop: "40px" }}>
            <Button
              variant="contained"
              onClick={() =>  alert("Filter Applied !")}
            >
              Apply Filters
            </Button>
          </div>
        );
      },
      // callback that gets executed when filters are confirmed
   
      
      print: false,
      textLabels: {
        body: {
          noMatch: this.state.isSaving
            ? "Loading data..!"
            : "Sorry, No Category Found",
          toolTip: "Sort",
          columnHeaderTooltip: (column) => `Sort for ${column.label}`,
        },
      },
    };
    // const handleRowClick = 
    return (
      <div className="pcoded-inner-content">
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-header">
              <div className="row align-items-end">
                <div className="col-lg-8">
                  <div className="page-header-title">
                    <div className="d-inline">
                      <h4>Customer Notification Templete</h4>
                    </div>
                  </div>
                 
                </div>
                <div className="col-lg-4">
                  <div className="page-header-breadcrumb">
                    <ul className="breadcrumb-title">
                      <li className="breadcrumb-item">
                        <Link to="/">
                          <i className="feather icon-home"></i>{" "}
                        </Link>
                      </li>
                      <li className="breadcrumb-item active">Customer Notification Templete</li>
                    </ul>
                  </div>
                </div>
                </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-block">
                  <div className="col">
                        {/* <Link
                          to="/users-HoAdmin/add"
                          className="btn btn-sm btn-inverse waves-effect waves-light f-right d-inline-block md-trigger"
                          data-modal="modal-13"
                        >
                          {" "}
                          <i className="icofont icofont-plus m-r-5"></i> Add
                          HO Admin{" "}
                        </Link> */}
                        {/* <Link
                          to="/importData"
                          className="btn-outline-dark btn btn-sm mx-1 f-right d-inline-block md-trigger"
                          data-modal="modal-13"
                        >
                          Import
                        </Link> */}
                        {!this.state.hidedownload ? (
                          <button
                            className="f-right bg-white b-none"
                            data-modal="modal-13"
                          >
                            <Tooltip
                              title="Download"
                              aria-label="download"
                              onClick={this.openModel}
                            >
                              <i
                                className="icofont icofont-download-alt"
                                style={{
                                  fontSize: "30px",
                                  color: "grey",
                                }}
                              ></i>
                            </Tooltip>
                          </button>
                        ) : (
                          <button
                            className="f-right bg-white b-none"
                            data-modal="modal-13"
                          >
                            <Tooltip
                              title="Download Selected"
                              aria-label="download"
                              onClick={this.openModel}
                            >
                              <i
                                className="icofont icofont-download-alt"
                                style={{
                                  fontSize: "30px",
                                  color: "grey",
                                }}
                              ></i>
                            </Tooltip>
                          </button>
                        )}
                      </div>
                     
                    <div className="dt-responsive table-responsive">
                      <MuiThemeProvider theme={this.getMuiTheme()}>
                          <MUIDataTable
                        className="table-responsive"
                        data={this.state.customerNotification}
                        columns={columns}
                        options={options}
                      />
                        </MuiThemeProvider>
                        {/* <nav
                          aria-label="Page navigation example "
                          className="display-flex float-right"
                        >
                          <ul class="pagination">
                            <li class="page-item mx-2 py-2">
                              Count : {this.state.datarange} -{" "}
                              {this.state.dataLength}
                            </li>
                            {this.state.datarange > 20 ? (
                              <li
                                class="page-item btn"
                                onClick={this.onChangePa.bind(this)}
                              >
                                <i class="icofont icofont-rounded-left"></i>
                              </li>
                            ) : (
                              <li class="page-item btn btn-disabled">
                                <i class="icofont icofont-rounded-left"></i>
                              </li>
                            )}
                            <li
                              class="page-item btn"
                              onClick={this.onChangePas.bind(this)}
                            >
                              <i class="icofont icofont-rounded-right"></i>
                            </li>
                          </ul>
                        </nav> */}

                      <AlertDialog
                          open={this.state.open}
                          func={this.handleClose}
                        />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerNotification;
