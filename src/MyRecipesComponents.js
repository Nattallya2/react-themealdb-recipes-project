function MyRecipesComponents({title, image, area, instructions}) {
    const instructionLines = instructions?.split(/\r?\n/);

    return(
        <div>
            <div className='container'> 
                <h2>{title}</h2>
            </div>

            <div className='container'>
                <img src={image} alt={title} className="mealImage"/>
            </div>

            <div className='container'>
                <p>{area} cousine</p>
            </div>
            
            <div className='container'>
                <p><strong>Instructions: </strong></p>
            </div>

            <div className='recipe'>
                {instructionLines?.map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </div>
        </div>
    )
}

export default MyRecipesComponents;