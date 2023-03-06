function CardListAssembler() {
    const fixedNavbarHeight = "270px";

    var stylingObject = {
        grid: {
        paddingTop: "20px",
        paddingRight: "40px",
        paddingLeft: "40px",
        display: "grid",
        gap: "2rem",
        maxHeight: `calc(100vh - ${fixedNavbarHeight})`,
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        overflow: "scroll",
        
        },
    };

    return (
        <div className='deck-grid disable-scrollbars' style={stylingObject.grid}>

        </div>
    )
}

export default CardListAssembler