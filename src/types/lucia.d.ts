/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("../auth/index").Auth;
  type DatabaseUserAttributes = {
    name: string;
    email?: string | null;
    picture: string;
    organization_id?: number | null;
  };
  type DatabaseSessionAttributes = {};
}
