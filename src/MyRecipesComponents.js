function MyRecipesComponents({title, image, area, instructions}) {
    return(
        <div>
            <div>
                <h2>{title}</h2>
            </div>

            <div>
                <img src={image} alt={title} className="mealImage"/>
            </div>

            <div>
                <p>{area} cousine</p>
            </div>
            
            <div>
                <p><strong>Instructions: </strong></p>
                <p>{instructions}</p>
            </div>
        </div>
    )
}

export default MyRecipesComponents;