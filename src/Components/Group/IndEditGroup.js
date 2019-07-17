import React, { Component } from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

class IndEditGroup extends Component {
    constructor(){
        super()
        this.state={
            isClicked:false
        }
    }

    deleteNewMember(id){
        this.props.deleteNewMember(id)
        this.setState({
            isClicked:false
        })
    }

    addMember(id){
        this.props.addMember(id)
        this.setState({
            isClicked:true
        })
    }


    render() {
        const { first, last, pic, id } = this.props.person
        const {availability} = this.props

        return (
            <div key={id} style={{ position: 'relative', display: 'flex', alignItems: 'center',background: 'lightgrey', borderRadius: '10px', width: '90%', margin: '0px auto',marginBottom:5 }}>
                    <div style={{ border: '1px solid black', width: 50, height: 50, borderRadius: '50%', marginLeft: 10, background: 'white', marginRight: 10 }}>
                        <img src={pic} style={{ height: '50px', width: '50px', borderRadius: '50%', left: 10, marginRight: '10px', position: 'absolute', zIndex: 1 }} alt='pic' />
                    </div>
                    <div style={{ background: availability, height: '15px', width: '15px', borderRadius: '50%', boxShadow: '-1px -1px 3px 2px black', position: 'absolute', left: 45, top: 35, zIndex: 2 }}></div>
                    <h3 >{first} {last}</h3>

                    {this.state.isClicked?<button onClick={() => this.deleteNewMember(id)} style={{ background: 'red', position: 'absolute', right: 20, borderRadius: '50%' }}>
                        <Icons className="fas fa-minus-circle" />
                    </button>:
                    <button onClick={() => this.addMember(id)} style={{ background: 'red', position: 'absolute', right: 20, borderRadius: '50%' }}>
                        <Plus className="fas fa-plus" />
                    </button>}
                </div>
        )
    }
}

function mapStateToProps(reduxState){
    return {
        selectedGroup: reduxState.selectedGroup,
        friends: reduxState.friends
    }
}

export default connect(mapStateToProps)(IndEditGroup)

const Icons = styled.i`
    font-size:25px;
    color:lightgrey;
`

const Plus = styled.i`
    font-size:25px;
    color:lightgrey;
`