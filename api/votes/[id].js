import { getFeatures } from '../../lib/googleSheets.js';

export default async function handler(req, res) {
  const { id } = req.params;

  try {
    const features = await getFeatures();
    const feature = features.find((f) => f.id === id);

    if (!feature) {
      return res.status(404).send('Feature not found');
    }

    res.json(feature);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
