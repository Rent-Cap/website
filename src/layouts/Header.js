import HeaderEn from "./Header-en";
import HeaderEs from "./Header-es";

const Header = () => {
    <AppContext.Consumer>
        {({ appCtx, updateContext }) => (
            (appCtx.lang && appCtx.lang === 'es') ?
                <HeaderEn />
                :
                <HeaderEs />
        )}
    </AppContext.Consumer>
}

export default Header;