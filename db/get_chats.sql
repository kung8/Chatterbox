select distinct room_id
from chats
where room_id ilike ${id1} or room_id ilike ${id2} and user_id in (
    select user_id
    from users
    where user_id = ${id}
    order by user_id asc
)
