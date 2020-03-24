import routesReducer from '../RouteReducer'

describe('Routes Reducer', () => {

    const initState = {
        routes : [
            { id: 0, name: "Hiking Naranco ", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: 'A beautiful landscape for a beautiful country like Spain. Vegetation is incredible, wildlife is amazing', images: ["https://source.unsplash.com/random/600x600", "https://source.unsplash.com/random/602x602"], videos: ["futuro video 1", "futuro video 2"] },
            { id: 1, name: "Hiking Ruta de las Xanas", author: "Marcos", positions: [[43.360383711, -5.850],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: '', images: [], videos: [] },
            { id: 2, name: "Senda del Oso", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: '', images: [], videos: [] },
            { id: 3, name: "Hiking Naranco", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: '', images: [], videos: [] },
            { id: 4, name: "Senda del Oso", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: '', images: [], videos: [] },
        ],
        selectedRoute: null
    }
   
    test('Should return default state', () =>{
        const newState = routesReducer(undefined, {});
        expect(newState).toEqual(initState);
    });

    describe('Should return state if receiving type', () =>{
        const route = { id: 5, name: "Hiking Naranco ", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: 'A beautiful landscape for a beautiful country like Spain. Vegetation is incredible, wildlife is amazing', images: ["https://source.unsplash.com/random/600x600", "https://source.unsplash.com/random/602x602"], videos: ["futuro video 1", "futuro video 2"] }
        
        test('Type SHOW_ROUTE', () => {
            const newState = routesReducer(route, {
                type : 'SHOW_ROUTE',
                payload: route
            });
            expect(newState).toEqual(route);
        })

        test('Type UPLOAD_ROUTE', () => {
            const newState = routesReducer(route, {
                type : 'UPLOAD_ROUTE',
                payload: route
            });
            expect(newState).toEqual(route);
        })

        test('Type CLEAR_ROUTE', () => {
            const newState = routesReducer(route, {
                type : 'CLEAR_ROUTE',
                payload: null
            });
            expect(newState).toEqual(route);
        })

        test('Type DELETE_ROUTE', () => {
            const newState = routesReducer(route, {
                type : 'DELETE_ROUTE',
                payload: route
            });
            expect(newState).toEqual(route);
        })

        test('Type SHARE_ROUTE', () => {
            const newState = routesReducer(route, {
                type : 'SHARE_ROUTE',
                payload: route
            });
            expect(newState).toEqual(route);
        })
        
    });
})