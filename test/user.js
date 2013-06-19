module.exports = {
	"_access" : 0,
	"_id" : "idididididi",
	"_salt" : "saltsalt",
	"_stripe" : {
		"token" : {
			"id" : "tok_123456789",
			"livemode" : true,
			"created" : 1371554674,
			"used" : false,
			"object" : "token",
			"type" : "card",
			"card" : {
				"object" : "card",
				"last4" : "1234",
				"type" : "Visa",
				"exp_month" : 12,
				"exp_year" : 2010,
				"fingerprint" : "jfheu13384ghfljf",
				"country" : "GB",
				"name" : "Mr Name",
				"address_line1" : null,
				"address_line2" : null,
				"address_city" : null,
				"address_state" : null,
				"address_zip" : null,
				"address_country" : null,
				"address_line1_check" : null,
				"address_zip_check" : null,
				"cvc_check" : null
			},
			"amount" : 0,
			"currency" : "usd"
		},
		"plan" : "bus_monthly",
		"description" : "{\"username\":\"blabla\"}",
		"lastUpgrade" : {
			"next_recurring_charge" : {
				"amount" : 0,
				"date" : "2013-04-13"
			},
			"account_balance" : 0,
			"discount" : null,
			"subscription" : {
				"quantity" : 1,
				"canceled_at" : null,
				"trial_end" : null,
				"trial_start" : null,
				"ended_at" : null,
				"current_period_end" : 1374146675,
				"current_period_start" : 1371554675,
				"cancel_at_period_end" : false,
				"customer" : "cus_123456789",
				"status" : "active",
				"start" : 1371554675,
				"object" : "subscription",
				"plan" : {
					"trial_period_days" : null,
					"interval_count" : 1,
					"livemode" : true,
					"object" : "plan",
					"id" : "bus_monthly",
					"currency" : "usd",
					"amount" : 9900,
					"name" : "Business",
					"interval" : "month"
				}
			},
			"delinquent" : false,
			"email" : "blabla@test.com",
			"active_card" : {
				"address_zip_check" : null,
				"address_line1_check" : null,
				"cvc_check" : "pass",
				"address_country" : null,
				"address_zip" : null,
				"address_state" : null,
				"address_city" : null,
				"address_line2" : null,
				"address_line1" : null,
				"name" : "Mr Name",
				"country" : "GB",
				"fingerprint" : "jfheu13384ghfljf",
				"exp_year" : 2015,
				"exp_month" : 6,
				"type" : "Visa",
				"last4" : "1234",
				"object" : "card"
			},
			"description" : null,
			"livemode" : true,
			"id" : "cus_123456789",
			"created" : 1371554675,
			"object" : "customer"
		},
		"customerid" : "cus_123456789",
		"last_invoice" : {
			"date" : 1371554675,
			"id" : "in_123456789",
			"period_start" : 1371554675,
			"period_end" : 1371554675,
			"lines" : {
				"invoiceitems" : [ ],
				"prorations" : [ ],
				"subscriptions" : [
					{
						"id" : "su_123456789",
						"object" : "line_item",
						"type" : "subscription",
						"livemode" : true,
						"amount" : 9900,
						"currency" : "usd",
						"proration" : false,
						"period" : {
							"start" : 1371554675,
							"end" : 1374146675
						},
						"quantity" : 1,
						"plan" : {
							"interval" : "month",
							"name" : "Business",
							"amount" : 9900,
							"currency" : "usd",
							"id" : "bus_monthly",
							"object" : "plan",
							"livemode" : true,
							"interval_count" : 1,
							"trial_period_days" : null
						},
						"description" : null
					}
				]
			},
			"subtotal" : 9900,
			"total" : 9900,
			"customer" : "cus_123456789",
			"object" : "invoice",
			"attempted" : true,
			"closed" : true,
			"paid" : true,
			"livemode" : true,
			"attempt_count" : 0,
			"amount_due" : 9900,
			"currency" : "usd",
			"starting_balance" : 0,
			"ending_balance" : 0,
			"next_payment_attempt" : null,
			"charge" : "ch_123456789",
			"discount" : null
		}
	},
	"email" : "blabla@test.com",
	"paid_plan" : "pro",
	"profile" : {
		"avatar" : "",
		"bio" : "bio bio.",
		"location" : "UK",
		"name" : "Name Surname",
		"website" : "http://www.storify.com"
	},
	"username" : "username"
}