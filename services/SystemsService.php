<?php

namespace app\services;

use app\models\ar\Systems;
use PHPUnit\Util\InvalidDataSetException;
use WpOrg\Requests\Exception\InvalidArgument;
use yii\base\InvalidCallException;
use yii\base\InvalidConfigException;
use yii\base\InvalidValueException;
use yii\data\ArrayDataProvider;
use yii\db\ActiveQuery;
use yii\db\Expression;
use Yiisoft\Arrays\ArrayHelper;

use function app\helpers\d;

class SystemsService
{
    public ?array $form = null;
    public ?ArrayDataProvider $provider = null;

    public function __construct(array $form = null)
    {
        $this->form = $form;
    }

    public function findSystemsByName(): ActiveQuery
    {
        return Systems::find()
            ->alias('sys')
            ->select([
                'sys.*',
                'faction_name',
                'economy_name',
                'security_level'
            ])
            ->byName($this->form['sysName']);
    }

    public function findSystems(): ActiveQuery
    {
        $expr = $this->distanceExpr($this->form['refSystem']);

        $query = Systems::find()
            ->alias('sys')
            ->select([
                'sys.*',
                'faction_name',
                'economy_name',
                'security_level',
                "$expr as distance"
            ])
            ->genericJoin()
            ->filter(array_slice($this->form, 1, null, true));

        return $query;
    }

    public function distanceExpr(string $name): Expression|bool
    {
        $coords = $this->getCoords($name);
        if (is_array($coords) && !empty($coords)) {
            extract($this->getCoords($name));
        } else {
            throw new InvalidValueException();
        }

        return new Expression("ROUND(SQRT(POW((x - $x), 2) + POW((y - $y), 2) + POW((z - $z), 2)), 2)");
    }

    public function getCoords(string $name): array|null
    {
        return Systems::find()
            ->coords($name)
            ->asArray()
            /* ->cache(86400) */
            ->one();
    }
}
