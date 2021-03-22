import { PortfolioModel, Portfolio, Asset } from '../model/Portfolio';
import { User } from '../model/User';

export default class PortfolioRepo {
  public static async create(user: User, assets: Asset[] = <Asset[]>[]): Promise<Portfolio> {
    const portfolio = {
      user: user,
      assets: assets,
    } as Portfolio;

    return PortfolioModel.create(portfolio);
  }

  public static async findByUser(user: User): Promise<Portfolio | null> {
    return PortfolioModel.findOne({ user: user }).lean<Portfolio>().exec();
  }

  public static async addAsset(user: User, asset: Asset): Promise<Portfolio> {

    // Find portfolio
    var portfolio = await PortfolioRepo.findByUser(user);
    if (!portfolio) {
      // If user doesn't have a portfolio - create a new one
      return PortfolioRepo.create(user, [asset]);
    }

    // Find asset with the same ticker
    const savedAsset = portfolio.assets.find((a) => a.ticker === asset.ticker);
    
    if (savedAsset) {
      // If such asset exists - update its quantity and type
      const newQuantity = parseFloat(savedAsset.quantity) + parseFloat(asset.quantity);
      savedAsset.quantity = newQuantity.toString();
      savedAsset.type = asset.type;
    }

    // Update and return portfolio
    return PortfolioModel.findOneAndUpdate({ user: user }, { ...portfolio })
      .lean<Portfolio>()
      .exec();
  }

  public static async getAsset(user: User, ticker: string): Promise<Asset | null> {
    // Find portfolio
    var portfolio = await PortfolioRepo.findByUser(user);
    // Find asset with corresponding ticker
    const asset = portfolio?.assets?.find((a) => a.ticker === ticker);
    return asset ?? null;
  }
}
