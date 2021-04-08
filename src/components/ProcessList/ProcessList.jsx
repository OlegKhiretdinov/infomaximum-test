import React, { useEffect } from 'react'
import Process from './Process';

import { connect } from 'react-redux';
import { setProcessList } from '../../redux/process-reducer';

const ProcessList = (props) => {

  useEffect(() => props.setProcessList(), [])

  return (
    <div>
      {props.list.map(process => <Process key={process.id} process={process} />)}
    </div>
  )
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
