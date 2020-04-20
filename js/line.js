
class Line{
    constructor(startPoint,endPoint){
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    }

    segmentVector(){
        return {x:this.endPoint.x-this.startPoint.x,y:this.endPoint.y-this.startPoint.y};
    }

    returnPercentage(point){
        return Math.sqrt(Math.pow(point.x-this.startPoint.x,2)+Math.pow(point.y-this.startPoint.y,2))/Math.sqrt(Math.pow(this.endPoint.x-this.startPoint.x,2)+Math.pow(this.endPoint.y-this.startPoint.y,2))
    }
    
}