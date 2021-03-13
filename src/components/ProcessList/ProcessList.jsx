import React from 'react'
import Process from './Process';

import { getProcessList } from '../../api/request';
import { connect } from 'react-redux';
import { setProcessList } from '../../redux/process-reducer';

class ProcessList extends React.Component {

  componentDidMount() {
    getProcessList(this.props.token, this.props.setProcessList)
  }

  render() {
    return(
      <div>
        {this.props.list.length > 0
        ? this.props.list.map(process => <Process key={process.id} process={process} />)
        : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.login.token,
  list: state.processList.list,
})

const mapDispatchToProps = (dispatch) => ({
  setProcessList: (processList) => {
    dispatch(setProcessList(processList))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProcessList);
