module.exports = {
    getGroupChat: async (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params
        const groupChat = await db.groups.get_group_chat({ id })
        res.status(200).send(groupChat)
    },

    createGroup: async (req, res) => {
        const { group, name } = req.body;
        const db = req.app.get('db')
        const newGroup = await db.groups.create_group({ name })
        const { group_chat_id } = newGroup[0]
        const addedUser = group.map(async user_id => {
            return await db.group.add_user_to_group({ group_chat_id, user_id })
        })
        Promise.all(addedUser).then(() => res.sendStatus(200))
    },

    getGroups: async (req, res) => {
        const { user_id } = req.params
        const db = req.app.get('db')
        const groups = await db.groups.get_all_user_groups({ user_id })
        res.status(200).send(groups)
    },
    
    getMembers: async (req, res) => {
        const db = req.app.get('db')
        const {group_chat_id } = req.params
        const members = await db.groups.get_all_members({group_chat_id})
        res.send(members)
    },
    
    updateGroup: async(req,res)=>{
        const db = req.app.get('db')
        const {group_chat_id} = req.params;
        const {removed,added} = req.body;
        if(removed.length !==0){
            removed.forEach(async member => {
                await db.groups.update_group({group_chat_id,member})
            })
        }
        if(added.length !== 0){
            added.forEach(async id => {
                let returnedUser = await db.groups.check_if_id_exist({group_chat_id,id})
                if(!returnedUser[0]){
                    await db.groups.add_member_to_existing_group({group_chat_id,id})
                }
            })
        }
        res.sendStatus(200)
    }
}