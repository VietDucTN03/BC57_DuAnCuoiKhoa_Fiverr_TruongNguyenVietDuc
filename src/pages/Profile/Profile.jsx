import React from 'react';
import InfoUser from './InfoUser';
import JobContract from './JobContract';

import '../../assets/scss/pages/Profile/profile.scss'

export default function Profile() {
  return (
    <div className='profile'>
      <div className="profile-content">
        <InfoUser/>
        <JobContract/>
      </div>
    </div>
  )
}
