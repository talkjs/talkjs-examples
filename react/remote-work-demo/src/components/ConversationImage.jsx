const ConversationImage = ({image, imgClass, textClass}) => {
    if(image !== "") {
        return (
            <div className={imgClass}>
                <img className='rounded-sm' src={image} alt="avatar representing the conversation"></img>
            </div>
        )
    } else {
        return (
            <div className={textClass}>
                <span className='inline-block w-6'>#</span>
            </div>
        )
    }
}

export default ConversationImage
