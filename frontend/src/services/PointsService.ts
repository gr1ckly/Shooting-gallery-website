class PointsService {
    public static async getSlice(start: number, limit: number, accessToken: string): Promise<Response>{
        const data = {start: start, limit: limit};
        const finalUrl: string = window.location.origin + "/points";
        const response: Response = await fetch(finalUrl, {
                method: "GET",
                headers: {
                    'Authorization' : accessToken,
                    'Content-Type' : "application/json"
                },
                body: JSON.stringify(data)
            });
        return response;
    }

    public static async createPoint(x: number, y: number, r: number, accessToken: string): Promise<Response>{
        const data = {x: x, y: y, r: r,};
        const finalUrl: string = window.location.origin + "/points";
        const response: Response = await fetch(finalUrl, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'Authorization': accessToken
            },
            body: JSON.stringify(data)
        });
        return response
    }

    public static async getCountPoints(accessToken: string): Promise<Response>{
        const finalUrl: string = window.location.origin + "/points";
        const response: Response = await fetch(finalUrl, {
            method: "GET",
            headers: {
                'Authorization': accessToken
            }
        });
        return response;
    }
}

export default PointsService;