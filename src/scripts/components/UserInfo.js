export default class UserInfo {
  constructor(userInfoConfig) {
    this._profileName = document.querySelector(userInfoConfig.profileNameSelector);
    this._profileDescription = document.querySelector(userInfoConfig.profileDescriptionSelector);
  }

  getUserInfo() {
    return {
      username: this._profileName.textContent,
      description: this._profileDescription.textContent
    }
  }

  setUserInfo(userData) {
    this._profileName.textContent = userData.username;
    this._profileDescription.textContent = userData.description;
  }
}
