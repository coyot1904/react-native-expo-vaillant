import { createServer } from "miragejs";
import { faker } from "@faker-js/faker";

const customerCnt = 20;
const offsetId = 20000;

const createAddress = () => {
  return {
    street: faker.location.streetAddress(),
    zipCode: faker.location.zipCode(),
    city: faker.location.city(),
    country: faker.location.country(),
  };
};

const createRandomUser = (id: number) => {
  const sex = faker.person.sexType();
  const firstName = faker.person.firstName(sex);
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName });

  return {
    //_id: faker.string.uuid(),
    _id: id + offsetId,
    avatar: faker.image.avatarGitHub(),
    birthday: faker.date.birthdate(),
    email,
    firstName,
    lastName,
    sex,
    subscriptionTier: faker.helpers.arrayElement(["free", "basic", "business"]),
    address: createAddress(),
  };
};

if (window.server) {
  server.shutdown();
}

export const startServer = () => {
  window.server = createServer({
    routes() {
      this.get("/api/customers", () => {
        const customers = Array.from({ length: customerCnt }, (_, index) => {
          return createRandomUser(index);
        });
        return {
          count: customerCnt,
          customers,
        };
      });

      this.post("/api/customer-connectivity-report", (_, request) => {
        const body = JSON.parse(request.requestBody);
        const customerIds = (body["customerIds"] ?? []) as Array<number>;
        return {
          customerConnectivity: customerIds.map((id) => ({
            id,
            isConnected: faker.datatype.boolean(),
          })),
        };
      });
    },
  });
};
