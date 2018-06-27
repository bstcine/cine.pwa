import menu from '@/constant/menu';

const getNav = user => {
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
    menu.forEach(menu => {
        if (filter(menu, user)) {
            if (menu.url !== '/' && path.indexOf(menu.url) === 0) {
                menu.active = true;
                if (menu.children && menu.children.length) {
                    menu.children.forEach(child_menu => {
                        if (filter(child_menu, user)) {
                            if (path.indexOf(child_menu.url) === 0) child_menu.active = true;
                            navs2.push(child_menu);
                        }
                    });
                }
            }
            navs1.push(menu);
        }
    });
    return { navs1, navs2 };
};

export { getNav };
