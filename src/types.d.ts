interface BaseUser {
  id: string;
  username: string;
  profilePicture: string | null;
  coverPicture: string;
  bio: string | null;
  gender: string | null;
  relationshipStatus: string | null;
  city: string | null;
  street: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  lastLogin: string | null;
}

interface ProfileQuery {
  me: BaseUser;
}
