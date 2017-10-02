import React, { Component } from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
  FlatButton,
  Dialog
} from 'material-ui';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import IconMenu from 'material-ui/IconMenu';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import Delete from 'material-ui/svg-icons/action/delete';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import Lock from 'material-ui/svg-icons/action/lock';
import Unlock from 'material-ui/svg-icons/action/lock-open';
import { Tabs, Tab } from 'material-ui/Tabs';

import PersonAdd from 'material-ui/svg-icons/social/person-add';
import AddCircle from 'material-ui/svg-icons/content/add-circle';

import AddItem from './AddItem';
import AddList from './AddList';
import BuyGiftModal from './BuyGiftModal';
import Share from './Share';

import axios from 'axios';

const style = {
  listStyle: {
    marginLeft: 200,
    paddingLeft: 200,
    width: '100%'
  },
  paperStyle: {
    width: '100%',
    height: '100%'
  },
  dividerStyle: {
    width: '100%',
    marginLeft: 0,
    paddingLeft: 0
  },
  titleStyle: {
    width: '100%',
    textAlign: 'center',
    paddingTop: 15,
    color: 'white',
    backgroundColor: '#3D5AFE',
    paddingBottom: 30,
    height: '100%'
  },
  backgroundStyle: {
    backgroundColor: '#eaf2ff',
    height: '110%',
    paddingBottom: 40

  },
  imageStyle: {
    height: 200,
  },
  gridStyles: {
    textAlign: 'center',
    minWidth: '100%',
    width: '100%'
  },
  images: {
    maxHeight: 120,
    maxWidth: '100%'
  },
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  username: {
    position: 'absolute',
    top: 0,
    fontSize: 16,
    fontWeight: 400,
  }
};

class WishListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: null,
      currentList: null,
      purchasedItems: [],
      wantedItems: [],
      open: false,
      modalState: false,
      deleteOpen: false,
      shareOpen: false,
      addListOpen: false,
      showPurchased: false
    }
  }

  componentDidMount() {
    this.getUserData();
  }

  // toggles list from private to public
  toggleListType() {
      axios.put('/api/lists/'+this.state.currentList._id, {
        secret: !this.state.currentList.secret
      }).then((res) => {
        this.setState({
          currentList: res.data
        })
      })
    }

  showPurchased() {
    this.setState({ showPurchased: true });
  }

  showWanted() {
    this.setState({ showPurchased: false });
  }

  // API call to fetch user data
  getUserData() {
    //get the username from the url
    var username = this.props.match.params.username;
    //get the list_id from the url
    var list_id = this.props.match.params.list_id;
    var currentList;

    //fetch the data of the username
    axios("/api/users/"+username)
    .then((res)=>{
      return res.data;
    })
    .then((res)=>{
      //if a list was requested try to find that list
      if (list_id){
        //find the specific list and set it to currentList
        currentList = res.wishlists.filter((list) => {
          return list._id === list_id;
        })[0];

        //if the requested list isn't found then redirect back to user
        if (!currentList) {
          this.props.history.push('/'+username)
        }
      } else {
        //if no list is specified just set currentList the first wishlist
        currentList = res.wishlists[0];
      }

      if (currentList) {
        // filter and push to wanted or purchasedItems arrays
        var wantedItems = currentList.items.filter( (item) => {
          return item.purchased === false;
        });

        var purchasedItems = currentList.items.filter( (item) => {
          return item.purchased === true;
        });

        //update the state
        this.setState({
          userData: res,
          currentList: currentList,
          wantedItems: wantedItems,
          purchasedItems: purchasedItems
        });
      }

    })
    .catch((err) => {
      console.log(err);
    })
  }

  renderMessages() {
    //changed just now
    if (this.state.currentList) {
      var username = this.props.match.params.username;

      if (this.state.currentList.items && this.state.currentList.items.length >= 0) {
<<<<<<< HEAD
        return (
=======
        return (
>>>>>>> adding new logo when no items are in list

          this.state.userData.wishlists.map((list, index) => {
            return (
              <MenuItem
                key={index}
                rightIcon={list.secret ? <VisibilityOff /> : <Visibility />}
                primaryText={list.title}
                onClick={ () => {
                  this.props.history.push('/'+username+'/'+list._id);
                  this.setState({currentList: list});
                }} />
            )})
          )
      }
    }
  }

  goToList(list_id) {
    this.props.history.push('/'+this.props.match.params.username+'/'+list_id);
  }

  handleDelete() {
    axios.delete('/api/lists/'+this.state.currentList._id)
    .then((res) => {
      console.log(res.data);
      this.setState({
        deleteOpen: false
      })
      this.props.history.push('/'+this.props.match.params.username)
    })
  }

  handleDeleteOpen() {
    this.setState({
      deleteOpen: true
    })
  }

  handleDeleteClose() {
    console.log(this);
    this.setState({
      deleteOpen: false
    })
  }

  handleShareOpen() {
    this.setState({
      shareOpen: true
    })
  }

  handleShareClose() {
    this.setState({
      shareOpen: false
    })
  }

  handleAddListOpen() {
    this.setState({
      addListOpen: true
    })
  }

  handleAddListClose() {
    this.setState({
      addListOpen: false
    })
  }

  render() {

    const showTitle = () => {
      if (this.state.currentList) {
        return (
          <div>
            {this.state.currentList.title.toUpperCase()} <br/>
            <div style={style.username}>{this.props.match.params.username.toUpperCase()}</div>
            </div>
          )
      }
    }

    var wantedItems = [];
    var purchasedItems = [];
    if (this.state.currentList) {
      wantedItems = this.state.currentList.items.filter( (item) => {
        return item.purchased === false;
      });

      purchasedItems = this.state.currentList.items.filter( (item) => {
        return item.purchased === true;
      });
    }

    var isListOwner = false;
    if (this.state.currentList){
       isListOwner = this.props.currentUser._id === this.state.currentList.user_id;
    }

    const deleteActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleDeleteClose.bind(this)}
      />,
      <FlatButton
        label="Delete List"
        secondary={true}
        onClick={this.handleDelete.bind(this)}
      />,
    ];

    const topRightMenu = (
      this.state.currentList && <IconMenu iconButtonElement={
        <IconButton>
          <NavigationExpandMoreIcon />
        </IconButton>
      }>

        {/* Don't show unless user is list owner */}
        {isListOwner && <MenuItem rightIcon={this.state.currentList.secret ? <Unlock /> : <Lock />} onClick={()=>{this.toggleListType()}} primaryText={this.state.currentList.secret ? 'Make List Public' : 'Make List Private'} /> }
        {isListOwner && <MenuItem primaryText="Delete List" rightIcon={<Delete />} onClick={this.handleDeleteOpen.bind(this)} /> }
        {isListOwner && !this.state.currentList.secret && <MenuItem primaryText="Share" rightIcon={<PersonAdd />} onClick={this.handleShareOpen.bind(this)}/> }
        {isListOwner && <MenuItem primaryText="Create New List" rightIcon={<AddCircle />} onClick={this.handleAddListOpen.bind(this)}/> }
        {isListOwner && <Divider /> }

        {this.renderMessages()}

      </IconMenu>
    );

    var list = this.state.showPurchased ? purchasedItems : wantedItems;

    return (
      this.state.currentList && <div className="container" style={style.backgroundStyle}>

        { /* Displays the AddItem button only if currentList belongs to currentUser */
          isListOwner && <AddItem list={this.state.currentList} getdata={this.getUserData.bind(this)}/>
        }

        <div className="wishlistContainer" style={{maxWidth: 800, margin: 'auto', textAlign: 'center', paddingTop: 50}} >
          <div>
<<<<<<< HEAD
            <AppBar title={showTitle()}
=======
            <AppBar title={this.state.userData.username.toUpperCase() + "'S " + this.state.currentList.title.toUpperCase()}
>>>>>>> adding new logo when no items are in list
              iconElementRight={topRightMenu}
              iconElementLeft={
                this.state.currentList.secret
                  ? (<IconButton tooltip="Private List" touch={true} tooltipPosition="bottom-center">
                    <VisibilityOff style={{padding: 12}}/>
                  </IconButton>)
                  : (<IconButton tooltip="Public List" touch={true} tooltipPosition="bottom-center">
                    <Visibility style={{padding: 12}} />
                  </IconButton>)
              }
            ></AppBar>
            <Tabs>
              <Tab onActive={this.showWanted.bind(this)} label="Wanted Items" />
              <Tab onActive={this.showPurchased.bind(this)} label="Purchased Items" />
            </Tabs>
          </div>


          <AddList
            list={this.state.currentList}
            getdata={this.getUserData.bind(this)}
            open={this.state.addListOpen}
            onRequestClose={this.handleAddListClose.bind(this)}
            handleClose={this.handleAddListClose.bind(this)}
            state={this.state}
          />

          <Share
            user={this.props.currentUser}
            list={this.state.currentList}
            open={this.state.shareOpen}
            onRequestClose={this.handleShareClose.bind(this)}
            handleClose={this.handleShareClose.bind(this)}
          />

          <Dialog
            actions={deleteActions}
            modal={false}
            open={this.state.deleteOpen}
            onRequestClose={this.handleDeleteClose.bind(this)}
          >
            Are you sure you want to delete this list?
          </Dialog>

          <div className="paperContainer">
            <Paper zDepth={2}>
              <Table>
                <TableBody
                  displayRowCheckbox={false}
                >
                  {
                    list.map((row, index) => (
                      <TableRow hoverable={true} key={index}>
                        <TableRowColumn style={{fontSize: 18, width: '25%'}}>{row.title}</TableRowColumn>
                        <TableRowColumn  style={{fontSize: 18}}>${row.price}</TableRowColumn>
                        <TableRowColumn style={{color: 'white'}} >
                        {!row.purchased &&
                          <BuyGiftModal
                            primary={this.props.muiTheme.palette.primary1Color}
                            item={row}
                            index={index}
                            getUserData={this.getUserData.bind(this)}
                            isListOwner={isListOwner}
                            userData={this.state.userData}
                          />
                        }
                        </TableRowColumn>
                        <TableRowColumn hoverable={true} style={{ height: 140}}>
                          {
                            row.image_url && <Paper style={{marginTop: 10, maxHeight: 120, textAlign:'center'}} zDepth={1} >
                              <img alt={''} style={style.images} src={row.image_url}/>
                            </Paper>
                          }
                        </TableRowColumn>
                      </TableRow>
                    ))
                 }
                </TableBody>
              </Table>
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

export default muiThemeable()(WishListPage);
