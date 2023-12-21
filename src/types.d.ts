interface BaseUser {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
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
  isHuddledVerified: boolean;
  lastLogin: string | null;
}

interface ProfileQuery {
  me: BaseUser;
}
