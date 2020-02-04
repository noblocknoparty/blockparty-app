import React from 'react'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'

import { GlobalConsumer } from '../../GlobalState'
import Button from '../Forms/Button'
import Avatar from '../User/Avatar'

const Account = styled(Link)`
  display: flex;
  align-items: center;
  cursor: pointer;
`
const Username = styled('div')`
  max-width: 100px;
  color: white;
  font-family: 'Muli';
  margin-right: 5px;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const UserProfileButton = ({ userProfile }) => {
  const twitterProfile =
    userProfile &&
    userProfile.social &&
    userProfile.social.find(s => s.type === 'twitter')
  return (
    <>
      {/* <Notifications>Notification</Notifications> */}
      <Account to={`/user/${userProfile.username}`}>
        {userProfile ? (
          <Username data-testid="userprofile-name">
            {userProfile.username}
          </Username>
        ) : null}
        <Avatar
          src={`https://avatars.io/twitter/${
            twitterProfile ? twitterProfile.value : 'unknowntwitter123abc'
          }/medium`}
        />
      </Account>
    </>
  )
}

function SignInButton() {
  return (
    <GlobalConsumer>
      {({ userProfile, loggedIn, signIn, wallet }) => {
        if (!wallet) {
          return (
            <Button type="light" onClick={signIn} analyticsId="Sign In">
              Connect to Wallet
            </Button>
          )
        } else if (loggedIn && userProfile) {
          return <UserProfileButton userProfile={userProfile} />
        }

        return (
          <Button type="light" onClick={signIn} analyticsId="Sign In">
            Sign in
          </Button>
        )
      }}
    </GlobalConsumer>
  )
}

export default SignInButton
