select group_users_id,group_name,gu.group_chat_id,user_id 
from group_users gu
join group_chat gc on gc.group_chat_id = gu.group_chat_id
where user_id = ${user_id}