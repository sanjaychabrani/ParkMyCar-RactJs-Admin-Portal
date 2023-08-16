import React from 'react';

function withUser(WrappedComponent) {
  return class WithUser extends React.Component {
    state = {
      user: {
        name: 'Sanjay',
        email: 'Sanjay@gmail.com',
      },
    };

    render() {

      return <WrappedComponent user={this.state.user} {...this.props} />;
    }
  };
}

class UserInfo extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <h1>{user.name}</h1>
        <p>{user.email}</p>
      </div>
    );
  }
}

export default withUser(UserInfo);
