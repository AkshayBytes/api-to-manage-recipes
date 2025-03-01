const mongoose = require("mongoose");
const receipe2 = require("./models/recipe.model")
const {initializeDatabase} = require("./db/db.connect")
const express = require("express");
const app = express();
initializeDatabase();

app.use(express.json());

async function toCreateNewReceipe(theReceipeObj) {
    try {
        const theReceipe = new receipe2(theReceipeObj)
        const saveTheReceipe = await theReceipe.save()
        return saveTheReceipe
    } catch (error) {
        throw error
    }

}


app.post("/receipe", async(req, res) => {
    try {
        const actualReceipe = await toCreateNewReceipe(req.body)
        if(actualReceipe){
            res.json(actualReceipe)
        }else{
            res.status(404).json({error: "failde to create Book.", error})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to Create receipe", error})
    }
})

async function toGetAllRecipes() {
    try {
        const allRecipes = await receipe2.find()
        return allRecipes
    } catch (error) {
        throw error
    }
}


app.get("/", async (req, res) => {
    try {
        const actualAllRecipes = await toGetAllRecipes()
        if(actualAllRecipes){
            res.json(actualAllRecipes)
        }else{
            res.status(404).json({error: "failed to get all recipes."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch Recipes."})
    }
})

async function toGetRecipesByTitle(theTitle) {
    try {
        const recipesByTitle = await receipe2.findOne({title: theTitle })
        return recipesByTitle
    } catch (error) {
        throw error
    }
    
}


app.get("/recipes/theTitle/:title", async(req, res) => {
    try {
        const actualRecipeByTitle = await toGetRecipesByTitle(req.params.title)
        
        if(actualRecipeByTitle){
            res.json(actualRecipeByTitle)
        }else{
            res.status(404).json({error: "failed to get recipe by title.", error})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch recipes"})
    }
})


async function toGetRecipesByAuthor(authorName) {
    try {
        const recipeByAuthorName = await receipe2.findOne({author: authorName })
        return  recipeByAuthorName
    } catch (error) {
        console.log(error)
    }
    
}

app.get("/recipe/author/:theAuthor", async (req, res) => {
    try {
        const actualRecipesByAuthor = await toGetRecipesByAuthor(req.params.theAuthor)
        if(actualRecipesByAuthor){
            res.json(actualRecipesByAuthor)
        }else{
            res.status(404).json({error: "Failed to get recipes by Author name.", error})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to Fetch recipes."})
    }
})

async function toGetEasyRecipes(recipeCategory) {
      try {
        const perticularCategoryRecipes = await receipe2.find({difficulty: recipeCategory})
       // console.log(perticularCategoryRecipes)
        return perticularCategoryRecipes
        
      } catch (error) {
        throw error
      }    
}


app.get("/recipes/recipedifficultylevel/:difficultyLevel", async (req, res) => {
    try {
        const actualCategoryRecipes = await toGetEasyRecipes(req.params.difficultyLevel)
       // console.log(actualCategoryRecipes)
        if(actualCategoryRecipes){
            res.json(actualCategoryRecipes)
        }else{
            res.status(404).json({error: "Failed to fetch recipes by difficulty level", error})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to Fetch Recipes."})
    }
})


async function updateRecipesDifficultyLevel(recipesId, updatedDifficulty) {
    try {
        const updatedRecipesDifficultyLevel = await receipe2.findByIdAndUpdate(recipesId, updatedDifficulty, {new: true})
        return updatedRecipesDifficultyLevel
    } catch (error) {
        console.log(error)
    }
}

app.post("/recipe/updateRecipeDifficultyLevel/:recipeId", async (req, res) => {
    try {
        const actullyUpdatedRecipe = await updateRecipesDifficultyLevel(req.params.recipeId, req.body )
        if(actullyUpdatedRecipe){
            res.json(actullyUpdatedRecipe)
        }else{
            res.status(404).json({error: "Failed to update recipe."})
        }

    } catch (error) {
       res.status(500).json({error: "Failed to fetch recipes."}) 
    }
})

async function toUpdateRecipePrepTimeAndCooktime (recipeTitle, updationData) {
    try {
        const updatedRecipe = await receipe2.findOneAndUpdate({title: recipeTitle},updationData, {new: true})
        //console.log(updatedRecipe)
        return updatedRecipe
    } catch (error) {
        console.log(error)
    }
    
}

app.post("/recipe/updatePrepTimeCookTime/:theTitle", async (req, res) => {
    try {
        const actualUpdatedRecipe = await toUpdateRecipePrepTimeAndCooktime(req.params.theTitle, req.body)
        if(actualUpdatedRecipe){
            res.json(actualUpdatedRecipe)
        }else{
            res.status(404).json({error: "Failed to Update recipes."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch recipes", error})
    }
})


async function toDeleteRecipe(recipeId) {
    try {
        const deleteReceipe = await receipe2.findByIdAndDelete(recipeId)
        return deleteReceipe
    } catch (error) {
        throw error
    }
    
}

app.delete("/recipe/deleteRecipe/:recipeId", async(req, res) => {
    try {
        const actualDeleteRecipe = await toDeleteRecipe(req.params.recipeId)
        res.json(actualDeleteRecipe)
    } catch (error) {
        res.status(500).json({error: "Failed to Fetch Recipe.", error})
    }
})



const PORT = 3000;

app.listen(PORT , () => {
    console.log("server is running on port", PORT)
})




