interface BaseUser {
  id: string;
  profilePicture: string;
  coverPicture: string;
  gender: string | null;
  username: string;
  bio: string | null;
  relationshipStatus: string | null;
  city: string | null;
  lastLogin: string;
}

interface ProfileQuery {
  me: BaseUser;
}
