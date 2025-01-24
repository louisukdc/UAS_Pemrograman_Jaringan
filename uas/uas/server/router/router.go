package router

import (
	"uas/controller"

	"github.com/gofiber/fiber/v2"
)

// Setup routing information
func SetupRoutes(app *fiber.App) {

	// list => get
	// read blog => get (id)
	// add => post
	// update => put
	// delete => delete

	// Blog routes
	app.Get("/blog", controller.BlogList)          // List all blogs
	app.Get("/blog/:id", controller.BlogDetail)    // Get a specific blog by ID
	app.Post("/blog", controller.BlogCreate)       // Create a new blog
	app.Put("/blog/:id", controller.BlogUpdate)    // Update an existing blog by ID
	app.Delete("/blog/:id", controller.BlogDelete) // Delete a blog by ID

	// User routes
	app.Get("/user", controller.UserList)          // List all users
	app.Get("/user/:id", controller.UserDetail)    // Get a specific user by ID
	app.Post("/user", controller.UserCreate)       // Create a new user
	app.Put("/user/:id", controller.UserUpdate)    // Update an existing user by ID
	app.Delete("/user/:id", controller.UserDelete) // Delete a user by ID

	// Room routes
	app.Get("/room", controller.RoomList)          // List all users
	app.Get("/room/:id", controller.RoomDetail)    // Get a specific user by ID
	app.Post("/room", controller.RoomCreate)       // Create a new user
	app.Put("/room/:id", controller.RoomUpdate)    // Update an existing user by ID
	app.Delete("/room/:id", controller.RoomDelete) // Delete a user by ID

	// Room routes
	app.Get("/reservation", controller.ReservationList)          // List all users
	app.Get("/reservation/:id", controller.ReservationDetail)    // Get a specific user by ID
	app.Post("/reservation", controller.ReservationCreate)       // Create a new user
	app.Put("/reservation/:id", controller.ReservationUpdate)    // Update an existing user by ID
	app.Delete("/reservation/:id", controller.ReservationDelete) // Delete a user by ID

}
