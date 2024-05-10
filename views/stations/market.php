<?php

use app\widgets\Table\Table;
use yii\helpers\Html;
use yii\helpers\VarDumper;

$this->title = $station_name . ' market';
?>

<div class="bg-light">
    <?php /* VarDumper::dump($model, 10, true); */ ?>
</div>
<main class="flex-grow-1 bg-main-background d-flex flex-column justify-content-between sintony-reg">
    <div class='container-xxl'>
        <div class="row">
            <div class="col">
                <h1 class='mt-2 text-center fs-2 text-light-orange sintony-bold'>
                    <?= Html::encode($this->title) ?>
                </h1>
                <?php echo Table::widget([
                    'container' => 'w-table',
                    'model' => $model,
                    'columns' => [
                        [
                            'attribute' => 'buy_price',
                            'label' => 'buy price',
                        ],
                        [
                            'attribute' => 'demand',
                        ],
                        [
                            'attribute' => 'demand_bracket',
                            'label' => 'demand bracket',
                            'filter' => ['0' => '0', '1' => '1', '2' => '2', '3' => '3'],
                            'filterInputOptions' => [
                                'class' => 'form-select',
                            ],
                        ],
                        [
                            'attribute' => 'mean_price',
                            'label' => 'mean price',
                        ],
                        [
                            'attribute' => 'name',
                            'label' => 'commodity',
                            'filterInputOptions' => [
                                'class' => 'form-control',
                            ]
                        ],
                        [
                            'attribute' => 'sell_price',
                            'label' => 'sell price',
                        ],
                        [
                            'attribute' => 'stock',
                        ],
                        [
                            'attribute' => 'stock_bracket',
                            'label' => 'stock bracket',
                            'filter' => ['0' => '0', '1' => '1', '2' => '2', '3' => '3'],
                            'filterInputOptions' => [
                                'class' => 'form-select',
                            ],
                        ],
                        [
                            'attribute' => 'timestamp',
                            'label' => 'updated',
                        ],
                    ]
                ]); ?>
            </div>
        </div>
    </div>
</main>