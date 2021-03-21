import React from 'react'
import Process from './Process';

import { connect } from 'react-redux';
import { setProcessList } from '../../redux/process-reducer';

class ProcessList extends React.Component {

  componentDidMount() {
    this.props.setProcessList()
  }

  render() {
    return(
      <div>
        {this.props.list.length > 0 && this.props.list.map(process => <Process key={process.id} process={process} />)}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  list: state.processList.list,
})

const mapDispatchToProps = (dispatch) => ({
  setProcessList: () => {
    dispatch(setProcessList())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProcessList);
