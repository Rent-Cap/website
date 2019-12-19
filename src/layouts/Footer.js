import FooterEn from "./Footer-en";
import FooterEs from "./Footer-es";

const Footer = () => {
    <AppContext.Consumer>
        {({ appCtx, updateContext }) => (
            (appCtx.lang && appCtx.lang === 'es') ?
                <FooterEn />
                :
                <FooterEs />
        )}
    </AppContext.Consumer>
}

export default Footer;