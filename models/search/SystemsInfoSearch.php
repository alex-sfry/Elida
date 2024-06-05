<?php

namespace app\models\search;

use app\behaviors\SystemBehavior;
use app\models\ar\Systems;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use yii\db\Expression;
// use app\models\views\SystemsInfoView;
use yii\helpers\ArrayHelper;

use function app\helpers\d;

/**
 * SystemsInfoSearch represents the model behind the search form of `app\models\ar\SystemsInfoView`.
 */
class SystemsInfoSearch extends Systems /* SystemsInfoView */
{
    public function behaviors(): array
    {
        return ArrayHelper::merge(
            parent::behaviors(),
            [SystemBehavior::class]
        );
    }

    /**
     * {@inheritdoc}
     */
    public function rules(): array
    {
        return [
            [['id', 'population', 'security_id', 'allegiance_id', 'economy_id'], 'integer'],
            [['name'], 'string'],
            [['distance'], 'safe']
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     */
    public function search(array $params, int|null $max_distance, string $ref_sys_name): ActiveDataProvider
    {
        /** @var SystemBehavior|SystemsInfoSearch $this */

        extract($this->getCoords($ref_sys_name));
        $distance_expr = new Expression(
            "ROUND(SQRT(POW((x - $x), 2) + POW((y - $y), 2) + POW((z - $z), 2)), 2)"
        );

        $query = Systems::find()
            ->select([
                '*',
                "$distance_expr as distance",
            ])
            ->with(['security', 'allegiance', 'economy'])
            ;

        $max_distance && $query->where(['<=', $distance_expr, $max_distance]);

        // d($query->one());

        $dataProvider = new ActiveDataProvider([
            'query' => Systems::find(),
        ]);

        $this->load($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        /* grid filtering conditions */
        // $query->andFilterWhere([
        //     'distance_to_arrival' => $this->distance_to_arrival,
        // ]);

        // $query
        //     ->andFilterWhere(['like', 'station', $this->station])
        //     ->andFilterWhere(['like', 'government', $this->government])
        //     ->andFilterWhere(['like', 'system', $this->getAttribute('system')])
        //     ->andFilterWhere(['like', 'economy_name', $this->getAttribute('economy_name')])
        //     ->andFilterWhere(['like', 'allegiance', $this->getAttribute('allegiance')]);

        // switch ($this->type) {
        //     case 'S':
        //     case 'M':
        //     case 'Outpost':
        //         $query
        //             ->andFilterWhere(['type' => 'Outpost']);
        //         break;
        //     case 'L':
        //         $query
        //             ->andFilterWhere(['!=', 'type','Outpost']);
        //         break;
        //     default:
        //         $query
        //             ->andFilterWhere(['like', 'type', $this->type]);
        // }

        return $dataProvider;
    }
}