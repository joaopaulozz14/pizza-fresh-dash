import Menu from "../../components/Menu";
import { RoutePath } from "../../types/routes";
import { navigationItems } from "../../data/navigation";
import * as S from "./styles";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavColumn from "../../components/NavColumn";
import { Auth } from "../../helpers/Auth";

const Settings = () => {
  const navigate = useNavigate();
  const handleNavigation = (path: RoutePath) => navigate(path);
  const { pathname } = useLocation();
  //O useLocation retorna a URL atual contendo o pathname, search e o hash.

  const splitterPath = (path: string) => path.split("/").pop() as RoutePath;
  const path = splitterPath(pathname);

  return (
    <S.Settings>
      <Menu
        active={RoutePath.SETTINGS}
        navItems={navigationItems}
        onNavigate={handleNavigation}
        onLogout={Auth.logout}
      />
      <S.SettingsPage>
        <header>
          <S.SettingsPageHeaderTitle>Configurações</S.SettingsPageHeaderTitle>
        </header>
        <S.SettingsContent>
          <S.SettingsContentSidebar>
            <NavColumn activeRoute={path} />
          </S.SettingsContentSidebar>
          <S.SettingsContentBox>
            {path === splitterPath(RoutePath.SETTINGS) ? (
              <S.SettingsContentBoxEmpty>
                Selecione uma categoria
              </S.SettingsContentBoxEmpty>
            ) : (
              <Outlet />
            )}

            {/*O outlet é responsável por renderizar um componente filho*/}
          </S.SettingsContentBox>
        </S.SettingsContent>
      </S.SettingsPage>
    </S.Settings>
  );
};

export default Settings;
