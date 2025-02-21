import { QuikDB, CanisterMethod, InitOwnerArgs, ResultBool, GetOwnerArgs, Principal } from 'quikdb-cli-beta/v1/sdk';

const quikdb = new QuikDB();

const InitOwner = async (): Promise<Principal> => {
  await quikdb.init();
  const initOwnerResult: ResultBool = await quikdb.callCanisterMethod(CanisterMethod.InitOwner, []);

  if (initOwnerResult) {
    const owner: Principal = await quikdb.callCanisterMethod(CanisterMethod.GetOwner, []);
    return owner;
  } else {
    throw new Error("Init owner wasn't created!"); 
  }
}

const GetOwner = async (): Promise<string> => {
  try {
    await quikdb.init();
    const getOwnerArgs: GetOwnerArgs = [];
    const owner: Principal = await quikdb.callCanisterMethod(CanisterMethod.GetOwner, getOwnerArgs);
    if (owner._isPrincipal) {
      return `Owner Already exits: ${Array.from(owner.toText())}`   
    } else {
      const newOwner: Principal = await InitOwner();
      return `new owner ${Array.from(newOwner.toText())}`
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default GetOwner;