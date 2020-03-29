import routesReducer from '../RouteReducer'
import '@testing-library/jest-dom'

describe('Routes Reducer', () => {

    const routes = [
        { id: 0, name: "Hiking Naranco ", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: 'A beautiful landscape for a beautiful country like Spain. Vegetation is incredible, wildlife is amazing', images: ["https://source.unsplash.com/random/600x600", "https://source.unsplash.com/random/602x602"], videos: ["futuro video 1", "futuro video 2"], sharedWith: [] },
        { id: 1, name: "Hiking Ruta de las Xanas", author: "Marcos", positions: [[43.360383711, -5.850],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: '', images: [], videos: [], sharedWith: [] },
        { id: 2, name: "Senda del Oso", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: '', images: [], videos: [], sharedWith: [] },
        { id: 3, name: "Hiking Naranco", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: '', images: [], videos: [], sharedWith: [] },
        { id: 4, name: "Senda del Oso", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: '', images: [], videos: [], sharedWith: [] },
    ];

    const initState = {
        routes : routes,
        selectedRoute: null
    }
   
    test('Should return default state', () =>{
        const newState = routesReducer(undefined, {});
        expect(newState).toEqual({
            routes: [],
            selectedRoute: null,
            routesLoading: false,
            routesError: null
        });
    });

    describe('Should return state if receiving type', () =>{
        const route = { id: 5, name: "Hiking Naranco ", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: 'A beautiful landscape for a beautiful country like Spain. Vegetation is incredible, wildlife is amazing', images: ["https://source.unsplash.com/random/600x600", "https://source.unsplash.com/random/602x602"], videos: ["futuro video 1", "futuro video 2"], sharedWith: [] }
        
        test('Type SHOW_ROUTE', () => {
            const newState = routesReducer(initState, {
                type : 'SHOW_ROUTE',
                payload: route
            });
            const expected = {...initState, selectedRoute:route};
            expect(newState).toEqual(expected);
        })

        test('Type UPLOAD_ROUTE', () => {
            const newState = routesReducer(initState, {
                type : 'UPLOAD_ROUTE',
                payload: {
                    route: route,
                    routes: routes
                }
            });
            let previousRoutes = [...initState.routes];
            previousRoutes.push(route);            
            const expected = {...initState, routes: previousRoutes}
            expect(newState).toEqual(expected);
        })

        test('Type CLEAR_ROUTE', () => {
            const newState = routesReducer(initState, {
                type : 'CLEAR_ROUTE',
                payload: null
            });
            const expected = {...initState, selectedRoute:null}
            expect(newState).toEqual(expected);
        })

        test('Type DELETE_ROUTE', () => {
            const newState = routesReducer(initState, {
                type : 'DELETE_ROUTE',
                payload: route
            });
            let newRoutes = initState.routes.filter(r => r.id !== route.id);
            const expected = {...initState, routes:newRoutes};
            expect(newState).toEqual(expected);
        })

        test('Type SHARE_ROUTE', () => {
            let route = { id: 0, name: "Hiking Naranco ", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: 'A beautiful landscape for a beautiful country like Spain. Vegetation is incredible, wildlife is amazing', images: ["https://source.unsplash.com/random/600x600", "https://source.unsplash.com/random/602x602"], videos: ["futuro video 1", "futuro video 2"], sharedWith: [] };
            const newState = routesReducer(initState, {
                type : 'SHARE_ROUTE',
                payload: { route: route, friends: ['marcos']}
            });
            const routes = [
                { id: 0, name: "Hiking Naranco ", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: 'A beautiful landscape for a beautiful country like Spain. Vegetation is incredible, wildlife is amazing', images: ["https://source.unsplash.com/random/600x600", "https://source.unsplash.com/random/602x602"], videos: ["futuro video 1", "futuro video 2"], sharedWith: ['marcos'] },
                { id: 1, name: "Hiking Ruta de las Xanas", author: "Marcos", positions: [[43.360383711, -5.850],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: '', images: [], videos: [], sharedWith: [] },
                { id: 2, name: "Senda del Oso", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: '', images: [], videos: [], sharedWith: [] },
                { id: 3, name: "Hiking Naranco", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: '', images: [], videos: [], sharedWith: [] },
                { id: 4, name: "Senda del Oso", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: '', images: [], videos: [], sharedWith: [] },
            ];
        
            const expected = {
                routes : routes,
                selectedRoute: null
            }
            expect(newState).toEqual(expected);
        })
        
    });
})