const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Joi = require("joi");
const app = express();
const mongoose = require("mongoose");
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

mongoose
    .connect("mongodb+srv://isabellaaddas_db_user:SuperBat25%21@tandzdeli.z2xkox6.mongodb.net/?appName=TandZDeli")
    .then(() => console.log("Connected to mongodb..."))
    .catch((err) => console.error("could not connect ot mongodb...", err));

const orderSchema = new mongoose.Schema({
    name:String,
    category:String,
    price:Number,
    description:String,
    ingredients:[String],
    allergens:[String],
    img:String
});

const Order = mongoose.model("Order", orderSchema);

/*
let orders = [
    {
        "_id": 1,
        "name": "NAPLES STYLE",
        "category": "sandwich",
        "price": "11.99",
        "description": "A classic panuozzo (\"pizza sandwich\") full of the familiar flavors of prosciutto and parmesan.",
        "ingredients": [
            "homemade bread (baked daily)",
            "prosciutto",
            "grated parmigiano reggiano",
            "sliced provolone",
            "arugula",
            "a drizzle of olive oil"
        ],
        "allergens": [
            "gluten",
            "pork",
            "dairy"
        ],
        "img":"neapolitan-style.jpg"
    },
    {
        "_id": 2,
        "name": "SICILIAN BLEND",
        "category": "sandwich",
        "price": "10.99",
        "description": "A rounded bun stuffed with sweet and savory ingredients like ricotta and figs.",
        "ingredients": [
            "Italian bun",
            "ricotta",
            "lemon zest",
            "fig marmalade",
            "mortadella",
            "finely chopped pistachios",
            "a drizzle of olive oil"
        ],
        "allergens": [
            "gluten",
            "pork",
            "dairy",
            "tree nuts"
        ],
        "img":"sicilian-blend.jpg"
    },
    {
        "_id": 3,
        "name": "CALABRESE SPECIAL",
        "category": "sandwich",
        "price": "10.99",
        "description": "Heat guaranteed in every bite with Calabrian chili peppers spread across salami and cheese.",
        "ingredients": [
            "Ciabatta bread",
            "salami",
            "Calabrian chili peppers",
            "shaved parmigiano reggiano",
            "arugula",
            "pickled red onions"
        ],
        "allergens": [
            "gluten",
            "pork",
            "dairy"
        ],
        "img":"calabrese-special.jpg"
    },
    {
        "_id": 4,
        "name": "TUSCAN VILLAGE",
        "category": "sandwich",
        "price": "11.99",
        "description": "A specialty bread with bresaola, fresh mozzarella, and other flavorful ingredients.",
        "ingredients": [
            "Schiacciata bun (baked daily)",
            "bresaola",
            "fresh mozzarella",
            "arugula",
            "thin-sliced tomatoes",
            "a drizzle of olive oil"
        ],
        "allergens": [
            "gluten",
            "pork",
            "dairy"
        ],
        "img":"tuscan-village.jpg"
    },
    {
        "_id": 5,
        "name": "KOREAN MEATBALL SUB",
        "category": "sandwich",
        "price": "12.99",
        "description": "Meatballs flavored with Korean-inspired spices and topped with gochujang marinara sauce in a classic sub sandwich.",
        "ingredients": [
            "Artisan roll",
            "homemade Korean-inspired meatballs (breadcrumbs, pork, beef, onion, egg, sesame oil, ginger, soy sauce, garlic, gochugaru)",
            "Gochujang marinara sauce (olive oil, onion, gochujang, garlic, tomatoes)",
            "melted shredded mozzarella",
            "sliced onions"
        ],
        "allergens": [
            "gluten",
            "pork",
            "beef",
            "sesame oil",
            "eggs",
            "dairy"
        ],
        "img":"meatball-sub.jpg"
    },
    {
        "_id": 6,
        "name": "ROMAN RUINS",
        "category": "sandwich",
        "price": "11.99",
        "description": "A unique mix of mortadella and pistachio cream sandwiched between slices of homemade focaccia.",
        "ingredients": [
            "homemade focaccia (baked daily)",
            "mortadella",
            "pistachio cream",
            "fresh mozzarella",
            "fresh basil leaves"
        ],
        "allergens": [
            "gluten",
            "pork",
            "dairy",
            "tree nuts"
        ],
        "img":"roman-ruins.jpg"
    },
    {
        "_id": 7,
        "name": "BUILD YOUR OWN",
        "category": "sandwich",
        "price": "12.99",
        "description": "Choose your favorite ingredients and the perfect bread to wrap it all in for your ideal sandwich.",
        "ingredients": [
            "your choice"
        ],
        "allergens": [
            "varies with choices"
        ],
        "img":"build-own.jpg"
    },
    {
        "_id": 8,
        "name": "ITALIAN WEDDING",
        "category": "soup",
        "price": "8.99",
        "description": "Classic chicken broth flavored with Italian seasonings, featuring vegetables and meatballs.",
        "ingredients": [
            "chicken broth base",
            "homemade meatballs (beef, pork, egg, breadcrumbs, parmigiano reggiano, garlic, parsley)",
            "diced carrots",
            "diced onions",
            "diced celery",
            "Italian seasoning (parsley, oregano, salt, black pepper)",
            "fresh spinach",
            "olive oil",
            "acini de pepe"
        ],
        "allergens": [
            "gluten",
            "pork",
            "beef",
            "eggs",
            "celery",
            "carrots"
        ],
        "img":"italian-wedding.jpg"
    },
    {
        "_id": 9,
        "name": "MINESTRONE",
        "category": "soup",
        "price": "7.99",
        "description": "A hearty soup of beans and vegetatables in a tasty broth mixed with tomatoes.",
        "ingredients": [
            "vegetable broth base",
            "chopped onions",
            "chopped carrots",
            "chopped celery",
            "tomato paste",
            "chopped zucchini",
            "chopped potatoes",
            "garlic",
            "diced tomatoes",
            "baby spinach",
            "cannellini beans",
            "olive oil",
            "various seasonings (salt, black pepper, thyme, bay leaf)"
        ],
        "allergens": [
            "celery",
            "carrots"
        ],
        "img":"minestrone.jpg"
    },
    {
        "_id": 10,
        "name": "SEAWEED SOUP",
        "category": "soup",
        "price": "7.99",
        "description": "A simple but timeless Korean soup, typically eaten on one's birthday, featuring seaweed and beef.",
        "ingredients": [
            "plain water base",
            "dried seaweed",
            "sliced beef chunk",
            "sesame oil",
            "soy sauce",
            "garlic",
            "various seasonings (salt, black pepper)"
        ],
        "allergens": [
            "beef",
            "sesame oil"
        ],
        "img":"seaweed.jpg"
    },
    {
        "_id": 11,
        "name": "RIBOLLITA",
        "category": "soup",
        "price": "7.99",
        "description": "A warm Tuscan dish of flavorful bread, vegetables, beans and seasonings.",
        "ingredients": [
            "vegetable broth base",
            "bread",
            "chopped onions",
            "chopped carrots",
            "chopped celery",
            "garlic",
            "white wine",
            "diced tomatoes",
            "cannellini beans",
            "Tuscan kale",
            "various seasonings (salt, black pepper, rosemary)"
        ],
        "allergens": [
            "gluten",
            "celery",
            "carrots"
        ],
        "img":"ribollita.jpg"
    },
    {
        "_id": 12,
        "name": "PASTA E FAGIOLI",
        "category": "soup",
        "price": "7.99",
        "description": "A pasta soup with a tomato and vegetable broth base and cannellini beans as the star ingredient.",
        "ingredients": [
            "vegetable broth base",
            "finely chopped onions",
            "finely chopped carrots",
            "finely chopped celery",
            "garlic",
            "cannellini beans",
            "crushed tomatoes",
            "olive oil",
            "various seasonings (salt, black pepper, bay leaf, oregano, red pepper flakes)"
        ],
        "allergens": [
            "celery",
            "carrots"
        ],
        "img":"pasta-fagioli.jpg"
    },
    {
        "_id": 13,
        "name": "PORCHETTA",
        "category": "cold-cut",
        "price": "10.99",
        "description": "Korean and Italian roast pork belly infused with fennel seasoning. Served in slices (1/2lb servings)",
        "ingredients": [
            "roast pork belly",
            "garlic",
            "olive oil",
            "Tuscan fennel pollen",
            "various seasonings (sea salt, black pepper, rosemary)"
        ],
        "allergens": [
            "pork",
            "fennel"
        ],
        "img":"porchetta.jpg"
    },
    {
        "_id": 14,
        "name": "SALAMI",
        "category": "cold-cut",
        "price": "4.99",
        "description": "Dry cured pork with a mild biting taste, courtesy of whole peppercorns. Served in slices (1/2lb servings)",
        "ingredients": [
            "pork shoulder",
            "whole black peppercorns",
            "pork fatback",
            "salt",
            "sugar",
            "garlic",
            "red wine"
        ],
        "allergens": [
            "pork"
        ],
        "img":"salami.jpg"
    },
    {
        "_id": 15,
        "name": "PROSCIUTTO",
        "category": "cold-cut",
        "price": "8.99",
        "description": "Thin-sliced, cured ham with a salty flavor that complements any sandwich. Served in slices (1/2lb servings)",
        "ingredients": [
            "pork leg",
            "sea salt"
        ],
        "allergens": [
            "pork"
        ],
        "img":"prosciutto.jpg"
    },
    {
        "_id": 16,
        "name": "MORTADELLA",
        "category": "cold-cut",
        "price": "4.99",
        "description": "Classic cured pork featuring fat cubes, pistachios, and other various seasonings for taste. Served in slices (1/2lb servings)",
        "ingredients": [
            "lean pork",
            "pork belly",
            "pork fatback",
            "red wine",
            "salt",
            "whole black peppercorns",
            "whole pistachios",
            "various seasonings (white pepper, coriander, garlic powder, anise, ground caraway)"
        ],
        "allergens": [
            "pork",
            "tree nuts"
        ],
        "img":"mortadella.jpg"
    },
    {
        "_id": 17,
        "name": "CAPOCOLLO",
        "category": "cold-cut",
        "price": "6.99",
        "description": "Dry cured pork shoulder with a subtle smoky and spicy flavor and notes of coriander. Served in slices (1/2lb servings)",
        "ingredients": [
            "pork neck coppa",
            "salt",
            "various seasonings (black pepper, cloves, bay leaf, cinnamon, nutmeg, coriander)"
        ],
        "allergens": [
            "pork"
        ],
        "img":"capocollo.jpg"
    },
    {
    "_id": 18,
        "name": "SOPPRESSATA",
        "category": "cold-cut",
        "price": "5.99",
        "description": "A unique type of salami of coarsely ground pork and carrying hints of cinnamon and rosemary. Served in slices (1/2lb servings)",
        "ingredients": [
            "pork shoulder",
            "pork fatback",
            "salt",
            "garlic",
            "white wine",
            "various seasonings (black pepper, red pepper flakes, cinammon, rosemary)"
        ],
        "allergens": [
            "pork"
        ],
        "img":"soppressata.jpg"
    },
    {
        "_id": 19,
        "name": "BRESAOLA",
        "category": "cold-cut",
        "price": "7.99",
        "description": "Cured beef seasoned with red wine, rosemary, and more, sliced thin. Served in slices (1/2lb servings)",
        "ingredients": [
            "eye of round roast",
            "salt",
            "sugar",
            "red wine",
            "various seasonings (black pepper, rosemary, juniper, marjoram, sage)"
        ],
        "allergens": [
            "beef"
        ],
        "img":"bresaola.jpg"
    },
    {
        "_id": 20,
        "name": "GIARDINIERA",
        "category": "jarred",
        "price": "3.99",
        "description": "A mix of pickled vegetables for antipasto including cauliflower, carrots, celery, and red bell peppers.",
        "ingredients": [
            "cauliflower",
            "chopped carrots",
            "chopped celery",
            "red bell peppers",
            "onions",
            "pickles",
            "distilled vinegar",
            "water",
            "sea salt"
        ],
        "allergens": [
            "carrots",
            "celery"
        ],
        "img":"giardiniera.jpg"
    },
    {
        "_id": 21,
        "name": "ROASTED RED PEPPERS",
        "category": "jarred",
        "price": "3.99",
        "description": "Roasted red bell peppers seasoned and preserved in olive oil, best used in a sandwich.",
        "ingredients": [
            "red bell peppers",
            "olive oil",
            "sea salt",
            "water"
        ],
        "allergens": [
            "none of the common allergens"
        ],
        "img":"roast-peppers.jpg"
    },
    {
        "_id": 22,
        "name": "CALABRIAN PEPPERS",
        "category": "jarred",
        "price": "8.99",
        "description": "Crushed Calabrian chili peppers preserved in olive oil and perfect for spreading.",
        "ingredients": [
            "Calabrian chili peppers",
            "olive oil"
        ],
        "allergens": [
            "none of the common allergens"
        ],
        "img":"calabrian-peppers.jpg"
    },
    {
        "_id": 23,
        "name": "SUNDRIED TOMATOES",
        "category": "jarred",
        "price": "4.99",
        "description": "Thinly sliced, sun ripened and dried tomatoes preserved in oil, paired well with any fine bread.",
        "ingredients": [
            "dried tomatoes",
            "garlic",
            "olive oil",
            "water",
            "Italian seasoning (parsley, oregano, rosemary, salt, black pepper)"
        ],
        "allergens": [
            "none of the common allergens"
        ],
        "img":"sundried-tomatoes.jpg"
    },
    {
        "_id": 24,
        "name": "OLIVES",
        "category": "jarred",
        "price": "5.99",
        "description": "The finest pick of Castelvetrano olives, preserved in saltwater brine and olive oil.",
        "ingredients": [
            "Castelvetrano olives",
            "sea salt",
            "water",
            "olive oil"
        ],
        "allergens": [
            "none of the common allergens"
        ],
        "img":"olives.jpg"
    },
    {
        "_id": 25,
        "name": "KIMCHI",
        "category": "jarred",
        "price": "6.99",
        "description": "The famous Korean side dish of fermented cabbage and radish, homemade for a unique taste of spice and tang.",
        "ingredients": [
            "fermented cabbage",
            "fermented radish",
            "salt",
            "garlic",
            "sugar",
            "fish sauce",
            "gochugaru"
        ],
        "allergens": [
            "none of the common allergens"
        ],
        "img":"kimchi.jpg"
    },
    {
        "_id": 26,
        "name": "ROASTED EGGPLANT",
        "category": "jarred",
        "price": "4.99",
        "description": "The best eggplants, roasted for a smoky flavor and slightly mashed into jars of olive oil and vinegar.",
        "ingredients": [
            "roasted eggplant",
            "salt",
            "garlic",
            "water"
        ],
        "allergens": [
            "none of the common allergens"
        ],
        "img":"roast-eggplant.jpg"
    },
    {
        "_id": 27,
        "name": "PROVOLONE",
        "category": "cheese",
        "price": "8.99",
        "description": "Mild provolone, semi-hard and perfect for melting over any sandwich (10oz block servings)",
        "ingredients": [
            "cultured milk",
            "enzymes",
            "salt"
        ],
        "allergens": [
            "dairy"
        ],
        "img":"provolone.jpg"
    },
    {
        "_id": 28,
        "name": "ASIAGO",
        "category": "cheese",
        "price": "9.59",
        "description": "Fresh, mild asiago perfect for slicing into sandwiches and charcuturie boards (10oz block servings)",
        "ingredients": [
            "milk",
            "enzymes",
            "salt"
        ],
        "allergens": [
            "dairy"
        ],
        "img":"asiago.jpg"
    },
    {
        "_id": 29,
        "name": "MOZZARELLA",
        "category": "cheese",
        "price": "6.99",
        "description": "The freshest, quality mozzarella that shines in Caprese salads or flavorful sandwiches (10oz servings)",
        "ingredients": [
            "milk",
            "enzymes",
            "salt",
            "vinegar"
        ],
        "allergens": [
            "dairy"
        ],
        "img":"mozzarella.jpg"
    },
    {
        "_id": 30,
        "name": "FONTINA",
        "category": "cheese",
        "price": "8.99",
        "description": "Semi-soft fontina with nutty, earthy notes and rich flavoring, perfect for melting (10oz servings)",
        "ingredients": [
            "milk",
            "enzymes",
            "salt"
        ],
        "allergens": [
            "dairy"
        ],
        "img":"fontina.jpg"
    },
    {
        "_id": 31,
        "name": "SCAMORZA",
        "category": "cheese",
        "price": "10.99",
        "description": "Mild and slightly sweet, this unsmoked scamorza is great on its own or in salads and pizza (10oz servings)",
        "ingredients": [
            "milk",
            "enzymes",
            "salt",
            "citric acid"
        ],
        "allergens": [
            "dairy"
        ],
        "img":"scamorza.jpg"
    },
    {
        "_id": 32,
        "name": "PARMIGIANO REGGIANO",
        "category": "cheese",
        "price": "12.59",
        "description": "The famous cheese of Italy, aged to perfect hardness and flavor for shredding or eating alone (10oz servings)",
        "ingredients": [
            "milk",
            "enzymes",
            "salt"
        ],
        "allergens": [
            "dairy"
        ],
        "img":"parmigiano.jpg"
    },
    {
        "_id": 33,
        "name": "SALT & VINEGAR CHIPS",
        "category": "extra",
        "price": "1.99",
        "description": "Kettle cooked chips flavored with salt and vinegar (individual snack bag)",
        "ingredients": [
            "potatoes",
            "canola oil",
            "vinegar powder",
            "sea salt",
            "citric acid"
        ],
        "allergens": [
            "none of the common allergens"
        ],
        "img":"salt-vinegar.jpg"
    },
    {
        "_id": 34,
        "name": "KETTLE COOKED CHIPS",
        "category": "extra",
        "price": "1.99",
        "description": "Classic kettle cooked chips seasoned with salt (individual snack bag)",
        "ingredients": [
            "potatoes",
            "canola oil",
            "sea salt"
        ],
        "allergens": [
            "none of the common allergens"
        ],
        "img":"kettle-chip.jpg"
    },
    {
        "_id": 35,
        "name": "GARLIC DRESSING",
        "category": "extra",
        "price": "0.99",
        "description": "Creamy garlic dressing with hints of vinegar and lemon for a brighter taste (2oz cup)",
        "ingredients": [
            "garlic",
            "egg",
            "distilled vinegar",
            "salt",
            "corn starch",
            "canola oil",
            "milk"
        ],
        "allergens": [
            "eggs",
            "dairy"
        ],
        "img":"garlic-dressing.jpg"
    },
    {
        "_id": 36,
        "name": "VINAIGRETTE",
        "category": "extra",
        "price": "0.15",
        "description": "Traditional Italian vinaigrette made with the finest olive oil, balsamic vinegar and spices (2oz cup)",
        "ingredients": [
            "olive oil",
            "balsamic vinegar",
            "Italian seasoning (parsley, oregano, salt, black pepper)"
        ],
        "allergens": [
            "none of the common allergens"
        ],
        "img":"vinaigrette.jpg"
    },
    {
        "_id": 37,
        "name": "SAN PELLEGRINO",
        "category": "extra",
        "price": "2.09",
        "description": "The famous sparkling water of Italy, San Pellegrino (individual bottle)",
        "ingredients": [
            "carbonated mineral water"
        ],
        "allergens": [
            "none of the common allergens"
        ],
        "img":"san-pellegrino.jpg"
    },
    {
        "_id": 38,
        "name": "WATER BOTTLE",
        "category": "extra",
        "price": "1.99",
        "description": "Crisp, clean water (individual bottle)",
        "ingredients": [
            "spring water"
        ],
        "allergens": [
            "none of the common allergens"
        ],
        "img":"water.jpg"
    },
    {
        "_id": 39,
        "name": "TIRAMISU",
        "category": "dessert",
        "price": "4.69",
        "description": "One of Italy's most famous desserts, homemade tiramisu (Served by the slice)",
        "ingredients": [
            "freshly brewed espresso",
            "mascarpone cheese",
            "egg yolks",
            "sugar",
            "vanilla",
            "heavy whipping cream",
            "ladyfingers",
            "cocoa powder"
        ],
        "allergens": [
            "eggs",
            "dairy"
        ],
        "img":"tiramisu.jpg"
    },
    {
        "_id": 40,
        "name": "GELATO CUP",
        "category": "dessert",
        "price": "4.69",
        "description": "A 3.5oz cup of gelato, your choice of flavor (Flavors rotate weekly)",
        "ingredients": [
            "milk",
            "sugar",
            "egg yolks",
            "real fruit and extracts for various flavors"
        ],
        "allergens": [
            "eggs",
            "dairy",
            "varies with choices"
        ],
        "img":"gelato.jpg"
    },
    {
        "_id": 41,
        "name": "PISTACHIO HOTTEOK",
        "category": "dessert",
        "price": "6.99",
        "description": "A filled pancake hailing from the streets of Korea, stuffed with sweet and soft pistachio (2 count packages)",
        "ingredients": [
            "all purpose flour",
            "sea salt",
            "sugar",
            "instant yeast",
            "milk",
            "canola oil",
            "pistachio filling (sugar, crushed pistachios, pistachio extract, heavy cream)"
        ],
        "allergens": [
            "dairy",
            "tree nuts"
        ],
        "img":"pistachio-hotteok.jpg"
    },
    {
        "_id": 42,
        "name": "TIRAMISU MOCHI",
        "category": "dessert",
        "price": "6.99",
        "description": "A fusion of the famous tiramisu and mochi treats combined into one sweet, cold dessert (6 count packages)",
        "ingredients": [
            "mascarpone cheese",
            "sugar",
            "heavy whipping cream",
            "a dash of marsala",
            "rice flour",
            "ground coffee",
            "milk",
            "salt",
            "cocoa powder"
        ],
        "allergens": [
            "dairy"
        ],
        "img":"tiramisu-mochi.jpg"
    },
    {
        "_id": 43,
        "name": "ASSORTED ITALIAN COOKIES",
        "category": "dessert",
        "price": "7.19",
        "description": "An assortment of Italian-American and traditional Italian cookies alike (pre-packaged)",
        "ingredients": [
            "all purpose flour",
            "sugar",
            "egg",
            "fruit filling (apricot jam, raspberry jam)",
            "unsalted butter",
            "almond extract",
            "almonds",
            "vanilla",
            "chocolate sprinkles",
            "rainbow sprinkles",
            "various food-safe dyes (red, brown)"
        ],
        "allergens": [
            "eggs",
            "dairy",
            "tree nuts",
            "wheat"
        ],
        "img":"assorted-cookies.jpg"
    }
];
*/

app.get("/api/orders/", async(req, res) => {
    const orders = await Order.find();
    res.send(orders);
});

app.get("/api/orders/:id", async(req, res) => {
    const order = await Order.findOne({_id:id});
    res.send(order);
});

app.post("/api/orders", upload.single("img"), async(req,res)=>{
    console.log("in post request");
    const isValidOrder = validateOrder(req.body);

    if (isValidOrder.error){
        console.log("Error encountered");
        res.status(400).send(isValidOrder.error.details[0].message);
        return;
    }

    const order = new Order({
        name:req.body.name,
        category:properCategory(req.body.category),
        price:req.body.price,
        description:req.body.description,
        ingredients:makeArray(req.body.ingredients),
        allergens:makeArray(req.body.allergens),
    });

    if (req.file) {
        order.img = req.file.filename;
    }

    const newOrder = await order.save();
    res.status(200).send(newOrder);
});

const validateOrder = (order) => {
    const schema = Joi.object({
        _id:Joi.allow(""),
        name:Joi.string().min(3).required(),
        category:Joi.string().min(3).required(),
        price:Joi.number().min(0.10).required(),
        description:Joi.string().min(10).required(),
        ingredients:Joi.string().min(3).required(),
        allergens:Joi.string().min(3).required(),
    });

    return schema.validate(order);
};

const makeArray = (string) => {
    let array = [];
    if (string.includes(',')) {
        array = string.split(',');
    } else {
        array = [string];
    }

    return array;
};

const properCategory = (string) => {
    let cat = "";
    if (string == "sandwiches") {
        cat = "sandwich";
    } else if (string == "soups") {
        cat = "soup";
    } else if (string == "cold-cuts") {
        cat = "cold-cut";
    } else if (string == "jarred-goods") {
        cat = "jarred";
    } else if (string == "cheese") {
        cat = "cheese";
    } else if (string == "extras") {
        cat = "extra";
    } else if (string == "desserts") {
        cat = "dessert";
    }

    return cat;
};

app.put("/api/orders/:id", upload.single("img"), async(req, res) => {
    const isValidUpdate = validateOrder(req.body);

    if (isValidUpdate.error) {
        console.log("Invalid update information.");
        res.status(400).send(isValidUpdate.error.details[0].message);
        return;
    }

    const fieldsToUpdate = {
        name:req.body.name,
        category:req.body.category,
        price:req.body.price,
        description:req.body.description,
        ingredients:makeArray(req.body.ingredients),
        allergens:makeArray(req.body.allergens),
    }

    if (req.file) {
        fieldsToUpdate.img = req.file.filename;
    }

    const success = await Order.updateOne({_id:req.params.id}, fieldsToUpdate);

    if (!success) {
        res.status(404).send("Menu item to edit not found.");
        return;
    }

    const order = await Order.findById(req.params.id);
    res.status(200).send(order);
});

app.delete("/api/orders/:id", async(req, res) => {
    const order = await House.findByIdAndDelete(req.params.id);

    if (!order) {
        res.status(404).send("Menu item to delete not found.");
        return;
    }
    
    res.status(200).send(order);
});

app.listen(3001, () => {
    console.log("Server up");
});