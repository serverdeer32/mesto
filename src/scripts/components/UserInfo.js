export default class UserInfo {
  constructor(userInfoConfig) {
    this._profileName = document.querySelector(userInfoConfig.profileNameSelector);
    this._profileDescription = document.querySelector(userInfoConfig.profileDescriptionSelector);
    this._profileAvatar = document.querySelector(userInfoConfig.profileAvatar)
  }

  getUserInfo() {
    return {
      username: this._profileName.textContent,
      description: this._profileDescription.textContent
    }
  }

  setUserInfo({ username, description, avatar }) {
    this._profileName.textContent = username;
    this._profileDescription.textContent = description;
    this._profileAvatar.src = avatar;
  }
}
