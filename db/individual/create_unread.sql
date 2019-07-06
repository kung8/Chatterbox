insert into unread (receiver_id, sender_id, unread)
values (${id}, ${id1}, 0);

select first,last,pic,id,email,active, unread
from users
join unread on unread.sender_id = users.id
where sender_id = ${id1} and receiver_id = ${id} 
order by id asc
