select id,first,last,email,username 
from users
where id != ${id}
order by id 