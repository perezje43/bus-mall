var ctx = document.getElementById("myChart").getContext("2d");

var data = {
    labels: picture,
    datasets: [
        {
            label: "How many times clicked",

            // The properties below allow an array to be specified to change the value of the item at the given index
            // String  or array - the bar color
            backgroundColor: "rgba(255,99,132,0.2)",

            // String or array - bar stroke color
            borderColor: "rgba(255,99,132,1)",

            // Number or array - bar border width
            borderWidth: 1,

            // String or array - fill color when hovered
            hoverBackgroundColor: "rgba(255,99,132,0.4)",

            // String or array - border color when hovered
            hoverBorderColor: "rgba(255,99,132,1)",

            // The actual data
            data: resultsTimesClicked,

            // String - If specified, binds the dataset to a certain y-axis. If not specified, the first y-axis is used.
            yAxisID: "y-axis-0",
        },
        {
            label: "Times shown",
            backgroundColor: "rgba(54,162,235,0.2)",
            borderColor: "rgba(54,162,235,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(54,162,235,0.4)",
            hoverBorderColor: "rgba(54,162,235,1)",
            data: resultsTimesShown
        }
    ]
};

var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: data
});
