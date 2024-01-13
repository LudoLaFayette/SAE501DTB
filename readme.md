<!-- - GET `/recipes` - recuperer toutes les recettes,
- GET `/recipes/recipeId` recuperer une recette,
- POST `/cuisines/Add` - Ajouter une recette,
  - Body `{
  recipe_name,
  recipe_description,
  image_url,
  cuisine_id,
  goal_name, // Name of the goal (for creating if it doesn't exist)
  dietary_info_names, // Names of dietary information (for creating if they don't exist)
  allergies_info_names, // Names of allergies information (for creating if they don't exist)
  ingredients_data, // Array of ingredient details (name, quantity, unit)
  instructions
}`
    -Exemple `{    
        "recipe_name": "Salade de Mais",
        "recipe_description": "Classic African dish with corn",
        "image_url": "/corn.jpg",
        "cuisine_id": "6",
        "goal_name": "",
        "dietary_info_names": [ "", ""],
        "allergies_info_names": [ "" ],
        "ingredients_data": [
            {"ingredient_id": "11", "quantity": 2,"unit": "pieces"},
            {"ingredient_id": "13","quantity": 1,"unit": "pieces"}
        ],      
        "instructions": [
            {"step_number": 1, "StepInstruction": "Cut Onions and Garlic properly in small shards"},
            {"step_number": 2, "StepInstruction": "Add Corn"},
            {"step_number": 3, "StepInstruction": "Mix all of that"}
        ]
}`
- PUT - `/recipes/:recipeId/update    ` - BODY - `{
    "recipe_name" : "Salade aux morceaux de Mais",
     "recipe_description" : "African food, the best of the best", 
     "image_url" : "/corn.jpg", 
     "cuisine_id" : "6", 
     "goal_id" : "2"
} or

{    
        "recipe_name": "Salade de tomate et riz",
        "recipe_description": "Classic asian dish with rice and tomato",
        "image_url": "/corn.jpg",
        "cuisine_id": "7",
        "goal_id": "2",
        "dietary_info_names": [ "", ""],
        "allergies_info_names": [ "" ],
        "ingredients_data": [
            {"ingredient_id": "1", "quantity": 2,"unit": "pieces"},
            {"ingredient_id": "11","quantity": 1,"unit": "pieces"}
        ],      
        "instructions": [
            {"step_number": 1, "StepInstruction": "Cut tomato and onion properly in small shards"},
            {"step_number": 2, "StepInstruction": "Add water"},
            {"step_number": 3, "StepInstruction": "Mix all of that"}
        ]
}
`
- DELETE - `/recipes/:recipeId/delete` 
    - BODY - `aucun, juste l'adresse indiqué

`
GET /recipes - Récupérer toutes les recettes
GET /recipes/:recipeId - Récupérer une recette
GET /recipes/goal/:goalId - Récupérer les recettes d'un objectif
GET /recipes/cuisine/:cuisineId - Récupérer les recettes d'une cuisine
GET /recipes/no-allergy/:allergyId - Récupérer les recettes sans une certaine allergie
POST /cuisines/add - Ajouter une cuisine
Body: { name: String }
POST /recipes/add - Ajouter une recette
Body: { "recipe_name": "Riz cantonais", "recipe_description": "Riz cantonais rapide en 10mn", "image_url": "/riz-cantonais.jpg", "cuisine_id": 6, "goal_name": "Weight Loss", "dietary_info_names": [], "allergies_info_names": [], "ingredients_data": [ { "ingredient_id": 11, "quantity": 1 } ], "instructions": [ { "step_number": 1, "StepInstruction": "Faire bouillir l'eau" }, { "step_number": 2, "StepInstruction": "Emincer l'oignon" }, { "step_number": 3, "StepInstruction": "Mélanger et servir chaud" } ] }
POST /recipes/:recideId/add/ingredients - Ajouter un ingrédient à la recette
Body : { "name": "Rice", "quantity": 300, "unit": "grams" }
PUT /recipes/:recipeId/update - Modifier une recette
Body : { "recipe_name": "Délicieux riz cantonais", "image_url": "/riz-cantonais.jpg", "recipe_description": "Description mise à jour depuis insomnia", "goal_id": 4, "cuisine_id": 6 }
PUT /recipes/:recipeId/instructions/:stepNumber/update - Modifier une instruction d'une recette
Body : { "StepInstruction": "Faire bouillir l'eau" }
DELETE recipes/:recipeId/ingredients/:ingredientId/delete - Supprimer un ingrédient d'une recette
DELETE /recipes/:recipeId/instructions/:instructionId/delete - Supprimer une instruction d'une recette
DELETE /cuisines/:cuisineId/delete - Supprimer une cuisine
DELETE /recipes/:recipeId/delete - Supprimer une recette -->