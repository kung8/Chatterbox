select gm.*, group_name, username,first,last,pic,email 
from group_messages gm
join group_chat gc on gc.group_chat_id = gm.group_chat_id
join users u on gm.user_id = u.id
where gm.group_chat_id = ${id}
order by group_message_id asc