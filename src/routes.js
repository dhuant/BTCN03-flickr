import React from 'react';

import Explore from '../src/Page/Explore';
import SearchTag from '../src/Page/SearchTag';
import NotFound from '../src/Page/NotFound';
import Photo from '../src/Page/Photo';
const routes = [
    {
        path: "/",
        exact: true,
        main: () => <Explore/>
    },
    {
        path: "/explore",
        exact: true,
        main: () => <Explore/>
    },
    {
        path: "/search/:tag",
        exact: true,
        main: ({match}) => <SearchTag match={match}/>
    },
    {
        path: "/photo/:id",
        exact: true,
        main: ({match}) => <Photo match={match}/>
    },
    {
        path: "",
        exact: true,
        main: () => <NotFound/>
    },
    
]
export default routes;