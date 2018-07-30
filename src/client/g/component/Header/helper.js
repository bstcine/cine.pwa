import menus from '@/constant/menu';

const getNavs = user => {
    const filter = (menu, user) => {
        if (!menu.role_id) return true;
        if (user) {
            if (
                Array.isArray(menu.role_id) &&
                menu.role_id.includes(user.role_id)
            ) return true;
            if (menu.role_id === user.role_id) return true;
        } else {
            return false;
        }
    };
    const path = location.pathname.replace(/\/$/, '');
    let navs1 = [];
    let navs2 = [];
    let navs3 = [];
    menus.filter(menu => filter(menu, user)).forEach(menu1st => {
        navs1.push(menu1st);
        if (menu1st.url === path) menu1st.active = true;
        menu1st.children &&
            menu1st.children
                .filter(menu => filter(menu, user))
                .map(menu2nd => {
                    if (menu2nd.url === path) {
                        menu1st.active = true;
                        menu2nd.active = true;
                    }
                    return menu2nd;
                })
                .forEach(menu2nd => {
                    menu1st.active && navs2.push(menu2nd);
                    menu2nd.children &&
                        menu2nd.children
                            .filter(menu => filter(menu, user))
                            .forEach(menu3rd => {
                                if (menu3rd.url === path) {
                                    menu1st.active = true;
                                    menu2nd.active = true;
                                    navs3.push(menu2nd);
                                    navs3.push(menu3rd);
                                }
                            });
                });
    });
    return { navs1, navs2, navs3 };
};

export { getNavs };
