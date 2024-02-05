Make-a-Mess

As follow, you can find the routing of every databases per methods.

.GET /users -> Search all users
.GET /favorites -> Search all favorites
.GET /burgers -> Search all pre-made burgers
.GET /custom/bread -> Search all breads
.GET /custom/meat -> Search all meats
.GET /custom/cheese -> Search all cheeses
.GET /custom/sauce-> Search all sauces
.GET /custom/topping -> Search all topping

.GET /users/:id -> Search a specific user
.GET /favorites/:id -> Search a specific favorite
.GET /burgers/:id -> Search a specific pre-made burger
.GET /custom/bread/:id -> Search a specific bread
.GET /custom/meat/:id -> Search a specific meat
.GET /custom/cheese/:id -> Search a specific cheese
.GET /custom/sauce/:id -> Search a specific sauce
.GET /custom/topping/:id -> Search a specific topping

.PUT /users/:id -> Update a specific user
.PUT /favorites/:id -> Update a specific favorite
.PUT /burgers/:id -> Update a specific pre-made burger
.PUT /custom/bread/:id -> Update a specific bread
.PUT /custom/meat/:id -> Update a specific meat
.PUT /custom/cheese/:id -> Update a specific cheese
.PUT /custom/sauce/:id -> Update a specific sauce
.PUT /custom/topping/:id -> Update a specific topping

.DELETE /users/:id -> Delete a specific user
.DELETE /favorites/:id -> Delete a specific favorite
.DELETE /burgers/:id -> Delete a specific pre-made burger
.DELETE /custom/bread/:id -> Delete a specific bread
.DELETE /custom/meat/:id -> Delete a specific meat
.DELETE /custom/cheese/:id -> Delete a specific cheese
.DELETE /custom/sauce/:id -> Delete a specific sauce
.DELETE /custom/topping/:id -> Delete a specific topping

.POST /users/register -> Create new user account
.POST /users/login -> Login to account
.POST /send/recovery-email/reset/:email -> Reset Password

.POST /burgers/new -> Create new pre-made burger
.POST /custom/bread/new -> Create new bread
.POST /custom/meat/new -> Create new meat
.POST /custom/cheese/new -> Create new cheese
.POST /custom/sauce/new -> Create new sauce
.POST /custom/topping/new -> Create new topping

All database follow the CRUD schema :

add<DATABASE>
getAll<DATABASE>
getOne<DATABASE>
update<DATABASE>
delete<DATABASE>