import React, { Component } from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';
import { selectGroup, updateGroupChat } from '../../ducks/reducer'
import axios from 'axios'

class IndGroup extends Component {
    constructor() {
        super()
        this.state = {
            isEditOpened: false,
            members: [],
            removed: [],
            remaining: [],
            search: '',
            added: []
        }
    }
    async startGroupChat(group) {
        this.props.hamburgerToggleChatOnly()
        this.props.handleChatToggle()
        await this.props.selectGroup(group)
        axios.get(`/api/getGroupChat/${group.group_chat_id}`).then(res => {
            this.props.updateGroupChat(res.data)
        })
    }

    handleEditToggle = async () => {
        const { group_chat_id } = this.props.group
        const { data: members } = await axios.get(`/api/group/members/${group_chat_id}`)
        this.setState({
            isEditOpened: true,
            members
        })
    }

    deleteMember = (id) => {
        if (this.state.members.length > 3) {
            const members = [...this.state.members]
            const index = members.findIndex(member => member.group_users_id === id)
            members.splice(index, 1)
            let removed = [...this.state.removed, id]
            this.setState({ members, removed })
        } else {
            alert('Sorry cannot have less than 3 people')
        }
    }

    updateMembers = async (id) => {
        if (this.state.removed.length !== 0) {
            try {
                await axios.put(`/api/group/members/${id}`, { members: this.state.removed })
                this.setState({ isEditOpened: false })
            } catch {
                alert('Something went wrong with the update')
            }
        } else {
            alert('No changes made')
            this.setState({ isEditOpened: false })
        }
    }

    addMember = async (id) => {
        console.log(id, this.state.members[0].group_chat_id)


    }

    //Need to handle the add still and need to reconfigure the update so that it handles more than just the delete
    //Add a search so that it can really set the search
    //style the rest of the group edits

    render() {
        const { group } = this.props
        const searchList = [...this.props.friends]
        console.log(this.state.members)
        for (let i = 0; i < this.state.members.length; i++) {
            for (let j = 0; j < searchList.length; j++) {
                if (this.state.members[i].id === searchList[j].id) {
                    searchList.splice(j, 1)
                    j--
                }
            }
        }

        let searched = searchList.filter(person => {
            const searched = this.state.search.toLowerCase().split(' ')
            for (let i = 0; i < searched.length; i++) {
                const searchedName = searched[i]
                if (!person.first.toLowerCase().includes(searchedName) && !person.last.toLowerCase().includes(searchedName)) {
                    return false
                }

            } return true
        }).map(person => {
            const { first, last, active, pic, id } = person
            let availability
            if (active === 'active') {
                availability = 'green'
            } else if (active === 'busy') {
                availability = 'yellow'
            } else {
                availability = 'red'
            }
            return (
                <div key={id} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <div style={{ border: '1px solid black', width: 50, height: 50, borderRadius: '50%', marginLeft: 10, background: 'white', marginRight: 10 }}>
                        <img src={pic} style={{ height: '50px', width: '50px', borderRadius: '50%', left: 10, marginRight: '10px', position: 'absolute', zIndex: 1 }} alt='pic' />
                    </div>
                    <div style={{ background: availability, height: '15px', width: '15px', borderRadius: '50%', boxShadow: '-1px -1px 3px 2px black', position: 'absolute', left: 45, top: 35, zIndex: 2 }}></div>
                    <h3 >{first} {last}</h3>

                    <button onClick={() => this.addMember(id)} style={{ background: 'red', position: 'absolute', right: 20, borderRadius: '50%' }}>
                        <Plus className="fas fa-plus" />
                    </button>
                </div>
            )
        })

        const mappedMembers = this.state.members.map(member => {
            const { first, last, active, pic, group_users_id } = member
            let availability
            if (active === 'active') {
                availability = 'green'
            } else if (active === 'busy') {
                availability = 'yellow'
            } else {
                availability = 'red'
            }

            return (
                <div key={group_users_id} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <div style={{ border: '1px solid black', width: 50, height: 50, borderRadius: '50%', marginLeft: 10, background: 'white', marginRight: 10 }}>
                        <img src={pic} style={{ height: '50px', width: '50px', borderRadius: '50%', left: 10, marginRight: '10px', position: 'absolute', zIndex: 1 }} alt='pic' />
                    </div>
                    <div style={{ background: availability, height: '15px', width: '15px', borderRadius: '50%', boxShadow: '-1px -1px 3px 2px black', position: 'absolute', left: 45, top: 35, zIndex: 2 }}></div>
                    <h3 >{first} {last}</h3>

                    <button onClick={() => this.deleteMember(group_users_id)} style={{ background: 'red', position: 'absolute', right: 20, borderRadius: '50%' }}>
                        <Icons className="fas fa-minus-circle" />
                    </button>
                </div>
            )
        })

        return (
            <>
                <div style={{ display: 'flex', alignItems: 'center', background: '#29C9B8', borderRadius: '10px', width: '98%', marginLeft: '1%', position: 'relative', height: 50, justifyContent: 'space-between', marginBottom: 5 }}>
                    <h3 style={{ marginLeft: 10 }}>{group.group_name}</h3>
                    {this.state.isEditOpened ?
                        <div style={{ display: 'flex', height: '75%', width: '30%', justifyContent: 'space-between', marginRight: 10, alignItems: 'center' }}>
                            <Button onClick={() => this.updateMembers(group.group_chat_id)} >
                                <Icons className='far fa-save' />
                            </Button>
                            <Button style={{ background: 'red' }}>
                                <Icons className="fas fa-trash" />
                            </Button>
                        </div>
                        :
                        <div style={{ display: 'flex', height: '75%', width: '30%', justifyContent: 'space-between', marginRight: 10, alignItems: 'center' }}>
                            <Button onClick={() => this.startGroupChat(group)}>
                                <Icons className="fas fa-comment" />
                            </Button>
                            <Button style={{ background: 'red' }}>
                                <Icons onClick={() => this.handleEditToggle()} className="fas fa-pencil-alt" />
                            </Button>
                        </div>}
                </div>
                {this.state.isEditOpened && mappedMembers}
                {this.state.isEditOpened && searched}
            </>
        )
    }
}

function mapStateToProps(reduxState) {
    return {
        selectedGroup: reduxState.selectedGroup,
        friends: reduxState.friends
    }
}

export default connect(mapStateToProps, { selectGroup, updateGroupChat })(IndGroup)

const Button = styled.button`
    height:90%;
    width:45%;
    border-radius:50%;
    background: green;
    border:#303841 solid 1px;
    &:focus {
        box-shadow: 0 0 1px 1px darkgrey;
        outline: none;
    }
`

const Icons = styled.i`
    font-size:25px;
    color:lightgrey;
`

const Plus = styled.i`
    font-size:25px;
    color:lightgrey;
`