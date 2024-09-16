<?php

namespace app\behaviors;

use yii\base\Behavior;
use Yii;
use yii\helpers\Json;

class ShipyardShipsBehavior extends Behavior
{
    protected array $shipsReqArr = [
        'cMainSelect' => '',
        'refSystem' => 'Sol',
        'includeSurface' => 'No',
        'distanceFromStar' => 'Any',
        'formBtn' => ''
        ];

    public function getShipsList(): array
    {
        $arr = Json::decode(file_get_contents(Yii::$app->basePath . '/data/ships.json'));
        asort($arr);

        return $arr;
    }

    public function getShipsReqArr(array $params): array
    {
        $this->shipsReqArr['refSystem'] = $params['system'];
        $this->shipsReqArr['cMainSelect'] = $params['ship'];

        return $this->shipsReqArr;
    }
}
