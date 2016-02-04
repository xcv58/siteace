import React from 'react';

class NavLink extends React.Component {
  render() {
    const {name, href, newBadge} = this.props.link;
    return (
      <li className={this.props.pathname === href ? "active" : null}>
        <a href={href}>
          {name}
          {newBadge ? <span className="new badge">{newBadge}</span> : null}
        </a>
      </li>
    );
  }
}

class Navigation extends React.Component {
  componentDidMount() {
    $(".button-collapse").sideNav({
      menuWidth: 240,
      edge: 'right',
      closeOnClick: true
    });
  }

  getLoginoutBtn() {
    const loginoutClass = "waves-effect waves-light btn";
    if (this.props.user) {
      return (
        <li onClick={this.handleLoginout.bind(this)}>
          <a className={loginoutClass}>Logout</a>
        </li>
      );
    } else {
      return (
        <li onClick={this.handleLoginout.bind(this)}>
          <a className={loginoutClass}>Login</a>
        </li>
      );
    }
  }

  links() {
    const {path, context: {pathname}} = FlowRouter.current();
    const navLinks = [
      {name: "Home", href: "/"}
    ];
    if (this.props.user) {
      navLinks.push(
        {name: "New Website", href: "/new-website"}
      )
    };
    return navLinks.map((link) => {
      return (<NavLink key={link.name} link={link} pathname={pathname}/>);
    });
  }

  render() {
    const loginoutBtn = this.getLoginoutBtn();
    const links = this.links();
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#!" className="brand-logo">Siteace</a>
          <a href="#" data-activates="mobile-demo" className="button-collapse right"><i className="material-icons">menu</i></a>
          <ul className="right hide-on-med-and-down">
            {links}
            {loginoutBtn}
          </ul>
          <ul className="side-nav" id="mobile-demo">
            {links}
            {loginoutBtn}
          </ul>
        </div>
      </nav>
    );
  }

  handleLoginout() {
    const {user, login, logout} = this.props;
    if (user) {
      logout();
    } else {
      login();
    }
  }
}

export default Navigation;
